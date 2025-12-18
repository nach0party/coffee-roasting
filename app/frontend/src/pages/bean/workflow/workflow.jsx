import { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import { ManageBean } from "./manage";
import { AssignOrigin } from "./assignOrigin";
import { CoffeRoastingModal } from "../../../components/modal";

/**
 * A Modal with a workflow that helps you establish an understanding of
 * what exactly it is to manage a bean.  We display it another place, but,
 * here is where we're actually going to manage those values.
 */
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

  const childRef = useRef(null);
  const handleParentExecute = async () => {
    if (childRef.current) {
      return await childRef.current.executeChildLogic();
    }
  };

  // enforces a total workflow reset when new bean selected
  useEffect(() => {
    rotateTitle();
    rotateNextStepTitle();
    setStep(stepHierarchy[0]);
  }, [beanId]);

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
      return "Next";
    } else if (step === "assignOrigin") {
      return "Finish";
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
