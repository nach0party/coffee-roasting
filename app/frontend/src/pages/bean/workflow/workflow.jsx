import { useState, useRef, useEffect } from "react";
import Button from "@mui/material/Button";
import { ManageBean } from "./manage";
import { AssignOrigin } from "./assignOrigin";
import { CoffeRoastingModal } from "../../../components/modal";

/**
 * A series of modals with a workflow that helps you establish an understanding of
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
  const [openManageBean, setOpenManageBean] = useState(true);
  const stepHierarchy = ["manageBean", "assignOrigin"];

  if (!open) {
    return null;
  }

  // just handle any reloads of some states when the beanId is altered, will also leave where we left off
  // useEffect(() => {
  //   setStep("manageBean");
  // }, [beanId]);

  console.log(beanId, "beanId");
  console.log(step, "step");
  console.log(open, "open");

  return (
    <>
      {step === "manageBean" && (
        <CoffeRoastingModal
          open={openManageBean}
          setOpen={setOpenManageBean}
          title={"Manage your bean"}
          content={<ManageBean beanId={beanId} />}
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
                onClick={async () => {
                  try {
                    const results = await handleParentExecute();
                    if (results?.beanData) {
                      setBeanId(results.beanData.id);
                      await getBeans();
                    }
                    const currentStepIndex = stepHierarchy.indexOf(step);
                    console.log(currentStepIndex, "currentStepIndex");
                    const nextStep = stepHierarchy[currentStepIndex + 1];
                    console.log(nextStep, "nextStep");
                    if (!nextStep) {
                      setOpen(false);
                      return;
                    }
                    console.log("wat");
                    setStep(nextStep);
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                Next
              </Button>
            </>
          }
        />
      )}
      {step === "assignOrigin" && (
        <CoffeRoastingModal
          open={open}
          setOpen={setOpen}
          title={"Assign your bean an origin"}
          content={<AssignOrigin beanId={beanId} />}
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
                    console.log(currentStepIndex, "currentStepIndex");
                    const nextStep = stepHierarchy[currentStepIndex + 1];
                    console.log(nextStep, "nextStep");
                    if (!nextStep) {
                      setOpen(false);
                      return;
                    }
                    console.log("wat");
                    setStep(nextStep);
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
                Finish
              </Button>
            </>
          }
        />
      )}
    </>
  );
};
