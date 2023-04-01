import { useState } from "react"
import { Label, TextInput, Button, Textarea } from "flowbite-react"

const initialFormState = {
  email: '',
  password: '',
  content: ''
}

export const CreateFormComponent = (): JSX.Element => {
  const [formData, setFormData] = useState(initialFormState)

  const saveDataEvent = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()

    if (!formData.email || !formData.password || !formData.content) return
    console.log(formData)

    alert("data saved")
    setFormData(initialFormState)
  }
  
  return (
    <>
      <form className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="email1"
              value="Your email"
            />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="name@flowbite.com"
            required={true}
            onChange={e => setFormData({
              ...formData,
              email: e.target.value
            }) }
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="password1"
              value="Your password"
            />
          </div>
          <TextInput
            id="password1"
            type="password"
            required={true}
            onChange={e => setFormData({
              ...formData,
              "password": e.target.value
            }) }
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label
              htmlFor="large"
              value="Large input"
            />
          </div>
          <Textarea
            id="large"
            value={ formData.content }
            onChange={e => setFormData({
              ...formData,
              content: e.target.value
            }) }
          />
        </div>
        <Button type="submit" onClick={ saveDataEvent }>
          Submit
        </Button>
      </form>
    </>
  )
}