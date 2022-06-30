import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, EntryTypeOption, DiagnosisSelection, HealthCheckRatingOption } from "./FormField";
import { NewEntryFormFields } from "../../types";
import { useStateValue } from '../../state';
import { isDate } from '../../helpers';

interface Props {
  onSubmit: (values: NewEntryFormFields) => void;
  onCancel: () => void;
}

const entryTypesOption: EntryTypeOption[] = [
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
  { value: "Hospital", label: "Hospital" },
  { value: "HealthCheck", label: "Health Check" },
];

const healthCheckRatingOption: HealthCheckRatingOption[] = [
  { value: 1, label: "Healthy" },
  { value: 2, label: "LowRisk" },
  { value: 3, label: "HighRisk" },
  { value: 4, label: "CriticalRisk" },
];

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  const initialValues: NewEntryFormFields = {
    type: "HealthCheck",
    date: "",
    description: "",
    specialist: "",
    healthCheckRating: 1,
    diagnosisCodes: [],
    discharge: {
      date: '',
      criteria: '',
    },
    employerName: '',
    sickLeave: {
      startDate: '',
      endDate: ''
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const dateError = "Valid date required";

        // const errors: NewEntryFormFields  = {};
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let errors: { [field: string]: any } = {};

        // base fields
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }

        if (!values.date) {
          errors.date = requiredError;
        }

        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        if (!isDate(values.date)) {
          errors.date = dateError;
        }

        // discharge fields
        if (values.type === "Hospital") {
          if (values.discharge) {
            if (!isDate(values.discharge.date)) {
              errors = {
                ...errors,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                discharge: {
                  ...errors.discharge,
                  date: dateError
                }
              };
            }

            if (!values.discharge.date) {
              errors = {
                ...errors,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                discharge: {
                  ...errors.discharge,
                  date: requiredError
                }
              };
            }

            if (!values.discharge.criteria) {
              errors = {
                ...errors,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                discharge: {
                  ...errors.discharge,
                  criteria: requiredError
                }
              };
            }
          }
        }

        if (values.type === "OccupationalHealthcare") {
          if (!values.employerName) {
            errors.employerName = requiredError;
          }

          if (values.sickLeave) {
            if (!isDate(values.sickLeave.startDate)) {
              errors = {
                ...errors,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                sickLeave: {
                  ...errors.sickLeave,
                  startDate: dateError
                }
              };
            }

            if (!values.sickLeave.startDate) {
              errors = {
                ...errors,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                sickLeave: {
                  ...errors.sickLeave,
                  startDate: requiredError
                }
              };
            }

            if (!isDate(values.sickLeave.endDate)) {
              errors = {
                ...errors,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                sickLeave: {
                  ...errors.sickLeave,
                  endDate: dateError
                }
              };
            }

            if (!values.sickLeave.endDate) {
              errors = {
                ...errors,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                sickLeave: {
                  ...errors.sickLeave,
                  endDate: requiredError
                }
              };
            }
          }
        }

        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        return (
          <Form className="form ui">
            <SelectField
              label="Type"
              name="type"
              options={entryTypesOption}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            {values.type === "HealthCheck" &&
              <SelectField
                label="Health Check Rating"
                name="healthCheckRating"
                options={healthCheckRatingOption}
              />
            }

            {values.type === "Hospital" &&
              <>
                <Field
                  label="Discharge Date"
                  placeholder="YYYY-MM-DD"
                  name="discharge.date"
                  component={TextField}
                />
                <Field
                  label="Discharge Criteria"
                  placeholder="Discharge Criteria"
                  name="discharge.criteria"
                  component={TextField}
                />
              </>
            }

            {values.type === "OccupationalHealthcare" &&
              <>
                <Field
                  label="Employer Name"
                  placeholder="Employer Name"
                  name="employerName"
                  component={TextField}
                />
                <Field
                  label="Sick Leave Start Date"
                  placeholder="YYYY-MM-DD"
                  name="sickLeave.startDate"
                  component={TextField}
                />
                <Field
                  label="Sick Leave End Date"
                  placeholder="Discharge Criteria"
                  name="sickLeave.endDate"
                  component={TextField}
                />
              </>
            }

            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />

            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>

                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
