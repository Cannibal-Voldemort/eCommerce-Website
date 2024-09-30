import { Label } from "../ui/input";
import { Input } from "../ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
const types = {
  INPUT: "input",
  SELECT: "select",
  TEXTAREA: "textarea",
};

function CommonForm({ formControls, formData, setFormData, onSubmit, buttonText}) {
  function renderInputsByComponentType(getControlItem) {
    let element = null;
    switch (getControlItem.name) {
      case types.INPUT:
        element = (
          <Input
            name={getControlItem.placeholder}
            id={getControlItem.id}
            type={getControlItem.type}
          />
        );
        break;

      case types.SELECT:
        element = (
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map(
                    (optionItem = (
                      <SelectItem key={optionItem.id} value={optionItem.id}>
                        {optionItem.label}
                      </SelectItem>
                    ))
                  )
                : null}
            </SelectContent>
          </Select>
        );
        break;

      case types.TEXTAREA:
        element = (
            <Textarea
            name = {getControlItem.name}
            placeholder = {getControlItem.placeholder}
            id = {getControlItem.id}
            />
        )

        break;
          
      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
          />
        );
        break;
    }
    element;
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div className="grid w-full gap-1.5" key={controlItem.name}>
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputsByComponentType(controlItem)}
          </div>
        ))}
      </div>
      <Button type ='submit' className = 'mt-2 w-full'>{buttonText || 'Submit'}</Button>
    </form>
  );
}
export default CommonForm;
