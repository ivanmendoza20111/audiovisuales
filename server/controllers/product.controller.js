/* eslint-disable camelcase */
import HttpStatus from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';
import { pool } from '../db';

export const findAllProduct = async (req, res) => {
  try {
    const [product] = await pool.query(
      'SELECT * FROM view_product_full_data WHERE isActive = 1 ORDER BY createdAt DESC'
    );
    res.json({
      error: false,
      data: product,
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

export const findAllProductType = async (req, res) => {
  try {
    const [productType] = await pool.query(
      'SELECT id "value", type "label" FROM product_type ORDER BY type ASC'
    );
    res.json({
      error: false,
      data: productType,
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

export const findAllProductBrand = async (req, res) => {
  try {
    const [brand] = await pool.query(
      'SELECT id "value", brand "label" FROM product_brand ORDER BY brand ASC'
    );
    res.json({
      error: false,
      data: brand,
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

export const findProductById = async (req, res) => {
  try {
    const [product] = await pool.query(
      `SELECT * FROM view_product_full_data WHERE id = '${req.params.id}'`
    );
    res.json({
      error: false,
      data: product[0],
    });
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: err.message,
    });
  }
};

export const storeProduct = async (req, res) => {
  try {
    const { name, typeId, stock } = req.body;
    const id = uuidv4();
    const [result] = await pool.query(
      `SELECT COUNT(*) AS total from view_product_full_data WHERE name='${name}'`
    );
    const isProductRegistered = result[0].total > 0;

    if (isProductRegistered) {
      res.status(HttpStatus.BAD_REQUEST).json({
        details: [{ message: 'Product already exists.' }],
      });
    } else {
      const idBrand = await storeProductBrand(req, res, false);

      const insert = `INSERT INTO product (id, name, product_type_id, product_brand_id, stock, active) 
                VALUES ('${id}', '${name}', '${typeId}', '${idBrand}', '${stock}', '1');`;
      const [data] = await pool.query(insert);
      res.json({ success: true, data });
    }
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const storeProductType = async (req, res, onlyStore = true) => {
  try {
    const { type } = req.body;
    const id = uuidv4();
    const [result] = await pool.query(
      `SELECT COUNT(*) AS total from product_type where type = '${type}'`
    );
    const isTypeRegistered = result[0].total > 0;

    if (isTypeRegistered) {
      if (onlyStore) {
        res.status(HttpStatus.BAD_REQUEST).json({
          details: [{ message: 'Product type already exists.' }],
        });
      } else {
        const getId = await pool.query(`SELECT id from product_type where type = '${type}'`);

        return getId[0][0]['id'];
      }
    } else {
      const insert = `INSERT INTO product_type (id, type) 
                VALUES ('${id}', '${type}');`;
      const [data] = await pool.query(insert);

      if (onlyStore) {
        res.json({ success: true, data });
      } else {
        return id;
      }
    }
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const storeProductBrand = async (req, res, onlyStore = true) => {
  try {
    const { brand } = req.body;
    const id = uuidv4();
    const [result] = await pool.query(
      `SELECT COUNT(*) AS total from product_brand where brand = '${brand}'`
    );
    const isBrandRegistered = result[0].total > 0;

    if (isBrandRegistered) {
      if (onlyStore) {
        res.status(HttpStatus.BAD_REQUEST).json({
          details: [{ message: 'Product type already exists.' }],
        });
      } else {
        const [brands] = await pool.query(`SELECT id from product_brand where brand = '${brand}'`);

        return brands[0]['id'];
      }
    } else {
      const insert = `INSERT INTO product_brand (id, brand) 
                VALUES ('${id}', '${brand}' );`;
      const [data] = await pool.query(insert);

      if (onlyStore) {
        res.json({ success: true, data });
      } else {
        return id;
      }
    }
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id, name, typeId, brandId, brand, stock } = req.body;

    const [userCount] = await pool.query(
      `SELECT COUNT(*) AS total from product where name = '${name}' AND NOT id = '${id}'`
    );

    const isProductRegistered = userCount[0].total > 0;

    if (isProductRegistered) {
      res.status(HttpStatus.BAD_REQUEST).json({
        details: [{ message: 'Product Name already exists.' }],
      });
    } else {
      const [emailCount] = await pool.query(
        `SELECT COUNT(*) AS total from product_brand where brand = '${brand}' AND NOT id = '${brandId}'`
      );
      const isBrandRegistered = emailCount[0].total > 0;

      if (isBrandRegistered) {
        res.status(HttpStatus.BAD_REQUEST).json({
          details: [{ message: 'Brand already exists.' }],
        });
      } else {
        const updateUser = `UPDATE product_brand SET brand='${brand}' WHERE id = '${brandId}'`;
        const [user] = await pool.query(updateUser);

        const updateUserData = `UPDATE product SET name='${name}', product_type_id='${typeId}', product_brand_id='${brandId}', stock='${stock}', updated_at=CURRENT_TIMESTAMP WHERE id = '${id}'`;
        const [userData] = await pool.query(updateUserData);
        res.json({ success: true, user: user, userData: userData });
      }
    }
  } catch (error) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export function deleteProduct(req, res) {
  pool
    .query(`UPDATE product SET active = 0 WHERE id = '${req.params.id}';`)
    .then(() =>
      res.json({
        error: false,
        data: { message: 'Product deleted successfully.' },
      })
    )
    .catch((err) =>
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: true,
        data: { message: err.message },
      })
    );
}
