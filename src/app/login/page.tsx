import AuthModal from "@/components/AuthModal";
import ContentFooter from "@/components/Footer/ContentFooter";

const page = () => {
 return (
  <>
   <AuthModal loginPage />
   <div className="pb-20 md:pb-0 mx-auto w-fit md:mx-0 md:w-auto">
    <ContentFooter />
   </div>
  </>
 );
};
export default page;
