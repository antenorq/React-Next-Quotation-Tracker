import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

//components
import Layout from "../components/Layout";
import FormQuotation from "../components/FormQuotation";
//Toastify
import { toast } from "react-toastify";
//Context API
import { AuthContext } from "../context/AuthContext";
//hooks
import useFirebaseUploadFile from "../hooks/useFirebaseUploadFile";
import useListCustomers from "../hooks/useListCustomers";

const UpdateQuotation = () => {
  //userlogged
  const { user } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    customerId: "",
    userId: "",
    status: "",
    quoteGiven: "",
    date: "",
    followUp: "",
    quoteDetails: "",
    location: "",
    file: "",
  });

  //HOOKS
  const { UploadFile } = useFirebaseUploadFile();
  const customerList = useListCustomers();

  const navigate = useNavigate();

  //ID PARAM FROM LIST QUOTATION EDIT BUTTOM
  const { id } = useParams();

  //Load Quotattion from ID PARAM
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await fetch(process.env.REACT_APP_API_URL + "/api/quotation/" + id);
          const result = await response.json();

          if (result._id) {
            const updatedFormData = {
              customerId: result.customerId,
              userId: result.userId,
              status: result.status,
              quoteGiven: result.quoteGiven,
              date: moment.utc(result.date).format("YYYY-MM-DD"),
              followUp: moment.utc(result.followUp).format("YYYY-MM-DD"),
              quoteDetails: result.quoteDetails,
              location: result.location,
              //file: result.file,
            };

            setFormData(updatedFormData);
          } else {
            if (result.errors) {
              result.errors.map((error) => toast.error(error));
            } else {
              toast.error("Quotation Load - Something went wrong");
            }
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    };

    fetchData();
  }, [id]);

  //SUBMIT
  const handleSubmit = async (event) => {
    console.log("FORM DATA: ", formData);
    event.preventDefault();
    setValidated(true);

    const form = event.currentTarget;
    //invalid form
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    try {
      if (id) {
        const quotation_update = await fetch(process.env.REACT_APP_API_URL + "/api/quotation/update/" + id, {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: "Bearer " + user.token },
          body: JSON.stringify(formData),
        });

        const res_quotation_update = await quotation_update.json();

        if (res_quotation_update._id) {
          toast.success("Quotation Updated Successfully");

          const quotation_id = res_quotation_update._id;

          // FIREBASE STORAGE UPLOAD FILE
          if (formData.file !== undefined) {
            //Hook useFirebaseUploadFile to get fileUrl
            const fileUrl = await UploadFile(formData.file);

            //uploaded and get the fileUrl
            if (fileUrl) {
              const associatefile = { quotation_id, fileUrl };

              //request API to associate pdf with the quotation
              const response = await fetch(process.env.REACT_APP_API_URL + "/api/quotation/associatefile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(associatefile),
              });

              const result = await response.json();

              if (result.ok) {
                toast.success("FILE LINKED TO QUOTATION Successfully ");
              }
              if (result.errors) {
                result.errors.map((error) => toast.error(error));
              }
            } else {
              toast.error("Something went wrong to Upload File");
            }
          } else {
            toast.warning("we kept the same quote file as it was before");
          }
          // END OF FIREBASE UPLOAD
          navigate("/list_quotation");
        } // END OF IF QUOTATION RESULT WAS OK
        else {
          if (res_quotation_update.errors) {
            res_quotation_update.errors.map((error) => toast.error(error));
          } else toast.error("Quotation NOT Updated");
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Layout>
      <FormQuotation formData={formData} setFormData={setFormData} customerList={customerList} handleSubmit={handleSubmit} validated={validated} />
    </Layout>
  );
};

export default UpdateQuotation;
