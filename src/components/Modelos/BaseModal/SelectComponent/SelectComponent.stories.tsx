
import { MenuItem } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ChangeEvent, useState } from 'react';
import { SelectComponent } from '.';
import { data } from '../../../Form';

export default {
  title: 'Example/SelectComponent',
  component: SelectComponent,
  args: {
    name: 'fabricante',
    label: 'Fabricante',
    errors: {
      fabricante: false,
    },

    touched: {
      fabricante: false,
    },

  },


} as ComponentMeta<typeof SelectComponent>;

export const Template: ComponentStory<typeof SelectComponent> = (args) => {
  const [localValue, setValue] = useState({
    name: 'Placeholder',
  });
  console.log(localValue)
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setValue({ ...localValue, [name]: value })
  }
  return (
    <div >

      <SelectComponent  {...args} handleChange={onChangeInput} value={localValue} >
        {data?.map((item) => (
          <MenuItem key={item.id} value={item.fabricante}>
            {item.fabricante}
          </MenuItem>
        ))}
      </SelectComponent>
    </div>
  );
}