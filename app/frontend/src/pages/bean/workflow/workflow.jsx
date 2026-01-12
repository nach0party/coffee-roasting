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
 *
 * TODO setting the bean may need to happen outside of the component only, that may make more sense...
 */
export const BeanWorkflow = ({
  bean,
  setBean,
  getBeans,
  openBeanWorkflow,
  setOpenBeanWorkflow,
}) => {
  const [step, setStep] = useState(stepHierarchy.ManageBean);
  const [disableManageBeanNextStep, setDisableManageBeanNextStep] =
    useState(false);

  useEffect(() => {
    if (!bean) {
      setBean({});
      setStep(stepHierarchy.ManageBean);
    }
  }, [bean]);

  console.log(bean, "beanworkflow (bean)");

  // TODO manage the bean state depending on the things we want updated per component??
  return (
    <>
      <CoffeRoastingModal
        open={openBeanWorkflow && step === stepHierarchy.ManageBean}
        setOpen={() => {
          setOpenBeanWorkflow(false);
        }}
        title={"Manage your bean"}
        content={
          <ManageBean
            bean={bean}
            setBean={setBean}
            setDisableManageBeanNextStep={setDisableManageBeanNextStep}
          />
        }
        actions={
          <>
            <Button
              onClick={() => {
                setOpenBeanWorkflow(false);
              }}
            >
              Back
            </Button>
            <Button
              disabled={disableManageBeanNextStep}
              onClick={async () => {
                // TOOD track changes, save only if needed
                try {
                  if (bean?.id) {
                    await api.beans.partialUpdate(bean.id, {
                      name: bean.name,
                      sca_grade: bean.sca_grade,
                      processing: bean.processing,
                    });
                    const beanResponse = await api.beans.get(bean.id);
                    setBean(beanResponse.data);
                  } else {
                    const createResponse = await api.beans.create(bean);
                    const beanResponse = await api.beans.get(
                      createResponse.data.id
                    );
                    setBean(beanResponse.data);
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
      {/** TODO really would prefer to separate some of this a bit more */}
      <CoffeRoastingModal
        open={openBeanWorkflow && step === stepHierarchy.AssignOrigin}
        setOpen={() => {
          setOpenBeanWorkflow(false);
        }}
        title={"Assign your bean an origin"}
        content={<AssignOrigin bean={bean} setBean={setBean} />}
        actions={
          <>
            <Button
              onClick={() => {
                setStep(stepHierarchy.ManageBean);
              }}
            >
              Back
            </Button>
            <Button
              onClick={async () => {
                // there's probably a more proper way to break all this down but
                // this is fine and / or works for now.
                try {
                  // we ALWAYS create a new origin if they change the data
                  const originResponse = await api.origins.create(bean.origin);
                  await api.beans.partialUpdate(bean.id, {
                    origin: originResponse.data.id,
                  });
                  const beanResponse = await api.beans.get(bean.id);
                  setBean(beanResponse.data);
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
    </>
  );
};
