import { useState, useRef } from "react";
import Button from "@mui/material/Button";

import CoffeRoastingModal from "../../../components/modal";
import { CreateBean } from "./createBean";
import { AssignOrigin } from "./assignOrigin";

/**
 * A Modal with a workflow that helps you establish an understanding of
 * what exactly it is to manage a bean.  We display it another place, but,
 * here is where we're actually going to manage those values.
 */
// TODO should we pass up beanId or the whole bean object to avoid API calls...
export const BeanWorkflow = ({ beanId, open, setOpen }) => {
  const [step, setStep] = useState("createBean");
  const [beanData, setBeanData] = useState({}); // TODO setup...
  const [disableNextStep, setDisableNextStep] = useState(false);
  const stepHierarchy = ["createBean", "assignOrigin", "createOrigin"];

  // TODO better naming
  // Handles executing downstream functions defined in the child components
  const childRef = useRef(null);
  const handleParentExecute = async () => {
    if (childRef.current) {
      return await childRef.current.executeChildLogic();
    }
  };

  const rotateTitle = () => {
    if (step === "createBean") {
      return "Create a new bean";
    } else if (step === "assignOrigin") {
      return "Assign your bean an origin";
    } else if (step === "createOrigin") {
      return "Create a new origin";
    }
  };

  const rotateNextStepTitle = () => {
    if (step === "createBean") {
      return "Assign your bean an origin";
    } else if (step === "assignOrigin") {
      return "Create a new origin";
    } else if (step === "createOrigin") {
      return "Create a new origin";
    }
  };

  return (
    <CoffeRoastingModal
      open={open}
      setOpen={setOpen}
      title={rotateTitle()}
      content={
        <>
          {step === "createBean" && (
            <CreateBean
              beanId={beanId}
              setDisableNextStep={setDisableNextStep}
              ref={childRef}
            />
          )}
          {step === "assignOrigin" && <AssignOrigin />}
        </>
      }
      actions={
        <>
          <Button
            onClick={() => {
              // TODO handle out of range index
              const currentStepIndex = stepHierarchy.indexOf(step);
              const backStep = stepHierarchy[currentStepIndex - 1];
              console.log(backStep, "backStep");
              if (currentStepIndex > 0) {
                setStep(backStep);
                return;
              }
              setOpen(false);
            }}
          >
            Back
          </Button>
          <Button
            disabled={disableNextStep}
            onClick={async () => {
              try {
                const beanData = await handleParentExecute();
                // TODO handle when we hit the end of the road here...
                const currentStepIndex = stepHierarchy.indexOf(step);
                const nextStep = stepHierarchy[currentStepIndex + 1];
                setStep(nextStep);
              } catch (error) {
                console.error(error);
              }
            }}
          >
            {rotateNextStepTitle()}
          </Button>
        </>
      }
    />
  );
};
