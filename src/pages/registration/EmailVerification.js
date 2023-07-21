import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AppLayOut } from "../../components/layout/AppLayOut";
import { Alert, Card, Container, Spinner } from "react-bootstrap";
import { verifyUserEmail } from "../../helpers/axiosHelper";

const EmailVerification = () => {
  const [isPending, setIsPending] = useState(true);
  const [response, setResponse] = useState({});
  const [queryParams] = useSearchParams();
  useEffect(() => {
    const obj = {
      emailValidationCode: queryParams.get("c"),
      email: queryParams.get("e"),
    };
    // call axios to call the server
    (async () => {
      const result = await verifyUserEmail(obj);
      setResponse(result);
      setIsPending(false);
    })();
  }, [queryParams]);
  return (
    <div>
      <AppLayOut>
        <Container className="page-main">
          <Card className="mt-5 p-2" style={{ width: "45rem" }}>
            {isPending && (
              <div>
                <Spinner
                  variant="primary"
                  animation="border"
                  className="m-auto p-3"
                ></Spinner>
                <h4>Email verification process begun, please wait......</h4>
              </div>
            )}
            {response.message && (
              <Alert
                variant={response.status === "success" ? "success" : "danger"}
              >
                {response.message}
              </Alert>
            )}
          </Card>
        </Container>
      </AppLayOut>
    </div>
  );
};

export default EmailVerification;
