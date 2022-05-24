import React, {useRef} from 'react';
import { useForm, Controller} from 'react-hook-form';
import Multiselect from "multiselect-react-dropdown";
import cn from 'classnames';
import './App.css';
interface colorData {
  value: string
  label: string
}
interface FormData {
  email: string
  password: string
  color: colorData
  animal: string
  tigerType?: string
}

type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & { options: Option[] };

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, ...props }, ref) => (
    <select ref={ref} {...props}>
      {options.map(({ label, value }) => (
        <option value={value}>{label}</option>
      ))}
    </select>
  )
);

function App() {
  
  const [
    isSuccessfullySubmitted,
    setIsSuccessfullySubmitted,
  ] = React.useState(false);
  const { register, control, handleSubmit, watch,reset, setValue, formState: { errors } } = useForm<FormData>({ mode: "onChange"});
  const onSubmit = handleSubmit(({email, password, color, animal, tigerType}) => {
    // This would be a POST command
    console.log(email, password, color, animal, tigerType);
    setIsSuccessfullySubmitted(true);
    // Reset empty values but not the multiselect, more investigation time required
    reset();
  });

  function tigers(animal: any) {
    return animal.value === 'Tiger';
  }
  const animalsSelected: any = watch('animal') || [];
  const displayOther = animalsSelected.some(tigers);
  

  return (
    <div className="App">
      <h1>Springload form</h1>
      
      <form action="" onSubmit={onSubmit}>
      {isSuccessfullySubmitted && (
        <div className="success">
          Succuess, your message was submitted (to console log)
        </div>
      )}
        <fieldset 
        className="form-fieldset"
        >
          <label 
          htmlFor="email"
          className={cn(
            'Input',
            { 'has-error': errors.email }
          )}
          >Email<sup>*</sup></label>
          <input 
            id="email"
            type="text" 
            placeholder="Email" 
            {...register("email", {
              required: true, 
              pattern: /^\S+@\S+$/i
            })} 
          />
        {errors.email && "Email is invalid"}
        </fieldset>
        <fieldset className="form-fieldset">
        <label 
          htmlFor="password"
          className={cn(
            'Input',
            { 'has-error': errors.password }
          )}
          >
            Password<sup>*</sup>
          </label>
         
          <input 
            id="password"
            type="password" 
            placeholder="Password" 
            {...register("password", {
              required: true,
              minLength: 9
            })} 
          />
        {errors.password && "Password must be greater than 8 characters"}
        </fieldset>
        <fieldset className="form-fieldset">
        <label 
          htmlFor="color"
          className={cn(
            'Input',
            { 'has-error': errors.color }
          )}
          >Color<sup>*</sup></label>

          <Select
            {...register("color")}
            options={[
              { label: "Blue", value: "blue" },
              { label: "Green", value: "green" },
              { label: "Red", value: "red" },
              { label: "Black", value: "black" },
              { label: "Brown", value: "brown" }
            ]}
          />
        </fieldset>
        <fieldset className="form-fieldset form-fieldset-multi">
        <label 
          htmlFor="animal"
          className={cn(
            'Input',
            { 'has-error': errors.animal }
          )}>Animal<sup>*</sup></label>
         

        <Controller
          name="animal"
          control={control}
          rules={{ required: true }}
          render={({ field: { ref, ...field } }) => {
            
            return (
              <Multiselect
                {...field}
                displayValue="name"
                onSelect={(selected, item) => {
                  setValue("animal", selected);
                }}
                onRemove={(selected, item) => {
                  setValue("animal", selected);
                }}
                options={[
                  { value: "Bear", name: "Bear", id: 1 },
                  { value: "Tiger", name: "Tiger", id: 2 },
                  { value: "Snake", name: "Snake", id: 3 },
                  { value: "Donkey", name: "Donkey", id: 4 },
                ]}
              />
            );
          }}
        />
        {errors.animal && "You must select at least one animal"}
        </fieldset>

         {displayOther &&
          (
            <fieldset className="form-fieldset">
            <label 
              htmlFor="tigerType"
              className={cn(
                'Input',
                { 'has-error': errors.tigerType }
              )}
              >
                Type of Tiger<sup>*</sup>
              </label>
             
              <input 
                id="tigerType"
                type="text" 
                placeholder="What kind of tiger?" 
                {...register("tigerType", {
                  required: true,
                  minLength: 1
                })} 
              />
              {errors.tigerType && "Please state tiger type"}
            </fieldset>
          )
        }     
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;