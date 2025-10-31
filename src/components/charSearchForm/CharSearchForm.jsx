import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import ErrorMesage from "../errorMessage/ErrorMessage";

import "./charSearchForm.scss";

const CharSearchForm = () => {
  const [char, setChar] = useState(null);
  const { loading, error, getCharacterByName, clearError } = useMarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = (name) => {
    clearError();

    getCharacterByName(name).then(onCharLoaded);
  };

  const errorMessage = error ? (
    <div className="char_search-critical-error">
      <ErrorMesage />
    </div>
  ) : null;
  const results = !char ? null : char.length > 0 ? (
    <div className="char_search-success-wrapper">
      <div className="char_search-success">
        {" "}
        There is! Visit {char[0].name} page?
      </div>
      <Link
        to={`/characters/${char[0].id}`}
        className="button button_secondary"
      >
        <div className="inner">To page</div>
      </Link>
    </div>
  ) : (
    <div className="char_search-error">
      The character was not found. Check the name and try agaiin.
    </div>
  );

  return (
    <div className="char_search-form">
      <Formik
        initialValues={{
          charName: "",
        }}
        validationSchema={Yup.object({
          charName: Yup.string().required("This field is required"),
        })}
        onSubmit={({ charName }) => {
          updateChar(charName);
        }}
      >
        <Form>
            <label className="char_search-label" htmlFor="charName">Or find a charcter by name:</label>
            <div className="char_search-wrapper">
                <Field
                    id="charName"
                    name="charName"
                    type="text"
                    pleaceholder="Enter name"
                />
                <button
                    type="submit"
                    className="button button_main"
                    disabled={loading}
                >
                    <div className="inner">find</div>

                </button>

            </div>

            <ErrorMessage component="div" className="char_search-error" name="charName"/>
        </Form>
      </Formik>
      {results}
      {errorMessage}
    </div>
  );
};

export default CharSearchForm;
