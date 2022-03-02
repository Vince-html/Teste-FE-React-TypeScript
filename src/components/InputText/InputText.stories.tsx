
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ChangeEvent, useState } from 'react';
import { InputText } from '.';

export default {
  title: 'Example/InputText',
  component: InputText,
  args: {
    name: 'title',
    label: 'Title',
    required: true,
    errors: {
      title: false,
    },
  }


} as ComponentMeta<typeof InputText>;

export const Template: ComponentStory<typeof InputText> = (args) => {
  const [localValue, setValue] = useState({
    title: '',
  });
  console.log(localValue)
  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setValue({ ...localValue, [name]: value })
  }
  return (
    <div >

      <InputText {...args} handleChange={onChangeInput} value={localValue} />
    </div>
  );
}