import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { ManageBean } from "./manage";
import { AssignOrigin } from "./assignOrigin";
import { CoffeRoastingModal } from "../../../components/modal";
import api from "../../../api/coffee-roasting-api";

const stepHierarchy = {
  ManageBean: "manageBean",
  AssignOrigin: "assignOrigin",
};

/**
 * A series of modals with a workflow that helps you establish an
 * understanding of what exactly it is to manage a bean.
 */
export const BeanWorkflow = ({
  bean,
  setBean,
  getBeans,
  openBeanWorkflow,
  setOpenBeanWorkflow,
}) => {
  const [step, setStep] = useState(stepHierarchy.ManageBean);

  useEffect(() => {
    setStep(stepHierarchy.ManageBean);
    if (!bean) {
      setBean({});
    }
  }, []);

  return (
    <>
      <CoffeRoastingModal
        open={openBeanWorkflow && step === stepHierarchy.ManageBean}
        setOpen={() => {
          setOpenBeanWorkflow(false);
        }}
        title={"Manage your bean"}
        content={<ManageBean bean={bean} />}
        actions={
          <>
            <Button
              onClick={() => {
                setOpenBeanWorkflow(false);
                setOpenManageBean(false);
              }}
            >
              Back
            </Button>
            <Button
              onClick={async () => {
                try {
                  if (bean?.id) {
                    const response = await api.beans.partialUpdate(
                      bean.id,
                      bean
                    );
                    console.log(response, "response");
                  } else {
                    const response = await api.beans.create(bean);
                    setBean(response.data);
                  }
                  await getBeans();
                  setStep("assignOrigin");
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
      <CoffeRoastingModal
        open={openBeanWorkflow && step === stepHierarchy.AssignOrigin}
        setOpen={() => {
          // setOpenAssignOrigin(false);
        }}
        title={"Assign your bean an origin"}
        content={<AssignOrigin bean={bean} />}
        actions={
          <>
            <Button
              onClick={() => {
                setStep(stepHierarchy.ManageBean);
              }}
            >
              Back
            </Button>
            <Button onClick={async () => {}}>Finish</Button>
          </>
        }
      />
    </>
  );
};
