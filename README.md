# Mortgage Calculator UI

TLDR: This is an assesment

## Getting Started

Dependency to make it work locally: https://github.com/normancarcamo/cmhc-server

Install depdencies

```bash
npm install
```

## Run

Run development (port 5173):

```bash
npm run dev
```

### Notes

- `Validations`: the project include basic validations due to they would take more time. They are a combination of controlled vs uncontrolled states. For example, to submit the form we are using uncontrolled state with the help of the form elements, but to show up the results we make use of a controlled state. The idea is to keep it simple, but I was thinking to implement a robust library such as react-final-form, formik, or react-hook-form.
- `Testing`: The testing was for the moment applied to the backend api due to the time of the assestment.
- `Port`: Important to mention that because this is for development purposes the port will be the `5173`, the server is allowing cors connections.
- `Formula`: The formula is applied only with the monthly payment schedule due to I didn't have to much time to complete it.
- `Erratas`: There might be some things in the formula that aren't quite well thought due to by the moment I was not too much familiar with amortizations or mortgages, but in a future it can be improved.
