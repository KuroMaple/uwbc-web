import MUICheckbox from '@mui/material/Checkbox'

type Props = {
  checked: boolean
  disabled?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const Checkbox: React.FC<Props> = ({ checked, disabled, onChange }) => {
  return (
    <MUICheckbox 
      checked={checked}
      disabled={disabled}
      onChange={onChange}
    />
  )
}

export default Checkbox