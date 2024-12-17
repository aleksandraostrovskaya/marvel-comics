import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


import './charSearchForm.scss';

function CharSearchForm() {

  return (
    <Formik
      initialValues={{
        name: '',
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('This field is required'),
      })}
      onSubmit={values => console.log(JSON.stringify(values, null, 2))}
    >
      <Form className='form'>
        <label className='form__label' htmlFor='name'>
          Or find a character by name:
        </label>
        <div className='form-wrapper'>
          <Field id='name' name='name' placeholder='Enter name' type='text' />
          <ErrorMessage className='form-error' name='name' component='div'/>
          <button type='submit' className='button button__main'>
            <div className='inner'>find</div>
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default CharSearchForm;
