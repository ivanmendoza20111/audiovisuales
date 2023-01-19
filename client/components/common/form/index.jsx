import { Button } from './Button';
import { Calendar } from './Calendar';
import CheckBox from './CheckBox';
import DropDown from './DropDown';
import { HourPicker } from './HourPicker';
import PhoneField from './PhoneField';
import TextField from './TextField';

export const NumberField = ({ ...props }) => <TextField type="number" {...props} />;
export const EmailField = ({ ...props }) => <TextField type="email" {...props} />;
export const PasswordField = ({ ...props }) => <TextField type="password" {...props} />;

export { DropDown, CheckBox, TextField, Calendar, Button, PhoneField, HourPicker };
