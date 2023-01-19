import HttpStatus from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../db';
import { sendEmail } from '../utils/email';
import { formatProductFields } from '../utils/reservation';

export const findAllFullInformation = async (req, res) => {
  try {
    const [result] = await pool.query(
      'SELECT * FROM view_reservation_full_data ORDER BY CreatedAt DESC'
    );
    res.json({
      error: false,
      data: formatProductFields(result),
    });
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const store = async (req, res) => {
  try {
    const {
      startHour,
      endHour,
      requester,
      userName,
      email,
      phone,
      userCode,
      classroom,
      subject,
      career,
      profName = null,
      profCode = null,
      equipment,
    } = req.body;

    const id = uuidv4();
    const [stockReport] = await pool.query(
      `CALL sp_occupied_stock_report('${startHour}', '${endHour}')`
    );
    const [stock] = stockReport;

    if (!stock.length) {
      res.status(HttpStatus.BAD_REQUEST).json({
        details: [{ message: 'No hay equipos en inventario.' }],
      });
    } else {
      let unavailableEquipment = [];

      stock.forEach((item) => {
        let productType = item.productType;

        if (equipment[productType] && item.stockAvailable < 1) {
          unavailableEquipment.push(productType);
        }
      });

      if (unavailableEquipment.length) {
        res.status(HttpStatus.BAD_REQUEST).json({
          details: [
            {
              message: `Estos equipos no estan disponibles en el rango de fechas establecido: '${unavailableEquipment.join(
                ', '
              )}'`,
            },
          ],
        });
      } else {
        const insert = `INSERT INTO reservation (id, from_date, to_date, user_type, user_name, user_email, user_phone, user_code, user_classroom, user_course, user_career, prof_name, prof_code)
          VALUES ('${id}', '${startHour}', '${endHour}', '${requester}', '${userName}', '${email}', '${phone}', '${userCode}', '${classroom}', '${subject}', '${career}', '${profName}', '${profCode}');`;
        const [data] = await pool.query(insert);

        const [productAvailabilityByName] = await pool.query(
          `CALL sp_available_product_by_name('${startHour}', '${endHour}')`
        );
        let skipEquipment = [];

        const asyncLoop = async () => {
          const [availabilityByName] = productAvailabilityByName;

          for (const item of availabilityByName) {
            let productType = item.type;

            if (
              equipment[productType] &&
              !skipEquipment.includes(productType) &&
              item.stockAvailable > 0
            ) {
              const insert = `INSERT INTO prod_vs_res (id, product_id, reservation_id) VALUES ('${uuidv4()}', '${
                item.id
              }', '${id}');`;
              await pool.query(insert);
              skipEquipment.push(productType);
            }
          }
        };
        await asyncLoop();
        await sendEmail(req.body);
        res.json({ success: true, data, message: 'Se ha reservado correctamente su petición.' });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    let newRes = {};

    if (req.body.isActive !== undefined) {
      newRes.active = req.body.isActive;
    }

    if (req.body.assistantId !== undefined) {
      newRes.assistant_id = req.body.assistantId;
    }

    const [result] = await pool.query('UPDATE reservation SET ? where id = ?', [
      newRes,
      req.params.id,
    ]);
    res.json({
      error: false,
      data: result,
    });
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};
