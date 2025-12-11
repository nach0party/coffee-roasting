import { useState, useRef } from "react";
import Button from "@mui/material/Button";
import CoffeRoastingModal from "../../../components/modal";
import { ManageBean } from "./manage";
import { AssignOrigin } from "./assignOrigin";

/**
 * A Modal with a workflow that helps you establish an understanding of
 * what exactly it is to manage a bean.  We display it another place, but,
 * here is where we're actually going to manage those values.
 */
// TODO should we pass up beanId or the whole bean object to avoid API calls...
export const BeanWorkflow = ({
  beanId,
  setBeanId,
  open,
  setOpen,
  getBeans,
}) => {
  const [step, setStep] = useState("manageBean");
  const [disableNextStep, setDisableNextStep] = useState(false);
  const stepHierarchy = ["manageBean", "assignOrigin"];

  // TODO better naming
  // Handles executing downstream functions defined in the child components
  const childRef = useRef(null);
  const handleParentExecute = async () => {
    if (childRef.current) {
      return await childRef.current.executeChildLogic();
    }
  };

  const rotateTitle = () => {
    if (step === "manageBean") {
      if (beanId) {
        return "Manage your bean";
      } else {
        return "Create a new bean";
      }
    } else if (step === "assignOrigin") {
      return "Assign your bean an origin";
    }
  };

  const rotateNextStepTitle = () => {
    if (step === "manageBean") {
      return "Assign your bean an origin";
    } else if (step === "assignOrigin") {
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
          {step === "manageBean" && (
            <ManageBean
              beanId={beanId}
              setDisableNextStep={setDisableNextStep}
              ref={childRef}
            />
          )}
          {step === "assignOrigin" && (
            <AssignOrigin beanId={beanId} ref={childRef} />
          )}
        </>
      }
      actions={
        <>
          <Button
            onClick={() => {
              const currentStepIndex = stepHierarchy.indexOf(step);
              const backStep = stepHierarchy[currentStepIndex - 1];
              if (currentStepIndex > 0) {
                setStep(backStep);
                return;
              }
              setOpen(false);
            }}
          >
            Back
          </Button>
          <Button>Save And Exit</Button>
          <Button
            disabled={disableNextStep}
            onClick={async () => {
              try {
                const results = await handleParentExecute();
                if (results?.beanData) {
                  setBeanId(results.beanData.id);
                  await getBeans();
                }
                const currentStepIndex = stepHierarchy.indexOf(step);
                const nextStep = stepHierarchy[currentStepIndex + 1];
                if (!nextStep) {
                  setOpen(false);
                  return;
                }
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
