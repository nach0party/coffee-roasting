import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { ManageBean } from "./manage";
import { AssignOrigin } from "./assignOrigin";
import { CoffeRoastingModal } from "../../../components/modal";

const stepHierarchy = ["manageBean", "assignOrigin"];

/**
 * A series of modals with a workflow that helps you establish an
 * understanding of what exactly it is to manage a bean.
 */
export const BeanWorkflow = ({
  bean,
  setBean,
  getBeans,
  setOpenBeanWorkflow,
}) => {
  const [step, setStep] = useState(stepHierarchy[0]);
  const [openManageBean, setOpenManageBean] = useState(true);
  const [openAssignOrigin, setOpenAssignOrigin] = useState(false);

  useEffect(() => {
    setOpenManageBean(true);
  }, []);

  return (
    <>
      {step === "manageBean" && (
        <CoffeRoastingModal
          open={step === "manageBean"}
          setOpen={() => {
            setOpenBeanWorkflow(false);
            setOpenManageBean(false);
          }}
          title={"Manage your bean"}
          content={<ManageBean bean={bean} />}
          actions={
            <>
              <Button onClick={() => {}}>Back</Button>
              <Button onClick={async () => {}}>Next</Button>
            </>
          }
        />
      )}
      {step === "assignOrigin" && (
        <CoffeRoastingModal
          open={openAssignOrigin}
          setOpen={() => {
            setOpenAssignOrigin(false);
            setOpenManageBean(false);
          }}
          title={"Assign your bean an origin"}
          content={<AssignOrigin bean={bean} />}
          actions={
            <>
              <Button onClick={() => {}}>Back</Button>
              <Button disabled={disableNextStep} onClick={async () => {}}>
                Finish
              </Button>
            </>
          }
        />
      )}
    </>
  );
};
