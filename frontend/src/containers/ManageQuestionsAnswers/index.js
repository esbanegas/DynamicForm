import React from "react";
import {
  ButtonPrimary,
  ButtonSecundary,
  ButtonUploadImage,
} from "../../controls/Button";
import { CheckboxControl } from "../../controls/Checkbox";
import { DynamicForm } from "../../controls/DynamicForm";
import { data } from "./data";

export const ManageQuestionsAnswers = () => {
  return (
    <div>
      {/* Configurar preguntas y respuestas
      <ButtonPrimary label="Hello" />
      <ButtonSecundary label="Hello" />
      <ButtonUploadImage isIconButton />
      <ButtonUploadImage /> */}
      {/* <CheckboxControl label="Dynamic Form" /> */}

      <DynamicForm form={data.form1} />

      <DynamicForm form={data.form2} />
    </div>
  );
};
