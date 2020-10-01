import React from "react";
import { data } from "../../containers/ManageQuestionsAnswers/data";
import { CheckboxControl } from "../Checkbox";

export const DynamicForm = ({ form }) => {
  return (
    <div>
      {form.map((f) =>
        f.questions.map((s) => (
          <div>
            <span>{s.label}</span>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {s.options.map((option) => (
                <CheckboxControl label={option} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
