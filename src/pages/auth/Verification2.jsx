// Verification.jsx
import { useEffect, useRef, useState }
	from "react";
import { Link, useNavigate } from "react-router-dom";
import { confirmOtp } from "@/calls/auth";
import { toast } from "sonner";
import Loading from "@/components/Loading";
import { useAuth } from "@/store/auth";

const Verification2 = ({ length = 6, onOtpSubmit = () => { }, callback="/reset" }) => {

	const [otp, setOtp] = useState(new Array(length).fill(""));
	const [ load, setLoad ] = useState(false);
	const inputRefs = useRef([]);
	const navigate = useNavigate();

	const { data: { number }, setData } = useAuth();

	useEffect(() => {
		if (inputRefs.current[0]) {
			inputRefs.current[0].focus();
		}
	}, []);

	onOtpSubmit = async (otp) => {
		setLoad(true);

		const result = await confirmOtp(otp, number)

		if(result) {
			setData({otp: true});
			if(typeof callback == "string") return navigate(callback);
			return callback();
		}

		setLoad(false);

		toast.error("Invalid or expired Token, please check your number and try again")
		
	}

	const handleChange = (index, e) => {
		const value = e.target.value;
		if (isNaN(value)) return;

		const newOtp = [...otp];
		// allow only one input
		newOtp[index] = value.substring(value.length - 1);
		setOtp(newOtp);

		// submit trigger
		const combinedOtp = newOtp.join("");
		if (combinedOtp.length === length)
			onOtpSubmit(combinedOtp);

		// Move to next input if current field is filled
		if (value && index < length - 1 &&
			inputRefs.current[index + 1]) {
			inputRefs.current[index + 1].focus();
		}
	};

	const handleClick = (index) => {
		inputRefs.current[index].setSelectionRange(1, 1);

		// optional
		if (index > 0 && !otp[index - 1]) {
			inputRefs.current[otp.indexOf("")].focus();
		}
	};

	const handleKeyDown = (index, e) => {
		if (
			e.key === "Backspace" &&
			!otp[index] &&
			index > 0 &&
			inputRefs.current[index - 1]
		) {
			// Move focus to the previous input field on backspace
			inputRefs.current[index - 1].focus();
		}
	}; //922353

	return (
		<div>
      <Loading load={load} />
      <div className="fixed-screen flex-col flex-center">
        <div className="logo h-[100px] w-[100px]">
            <img src="/images/logo.png" className="img-cover"/>
        </div>
        <div className="text-center max-w-[300px] my-6 mb-8">
          <h1 className="font-bold text-lg">Enter Verification Code</h1>
          <p className="text-xs text-gray-600">Please verify your account by entering the code sent to {number}</p>
        </div>

        <div className="flex flex-center gap-1.5">
          {otp.map((value, index) => {
            return (
              <input
                key={index}
                type="text"
                ref={(input) => (inputRefs.current[index] = input)}
                value={value}
                onChange={(e) => handleChange(index, e)}
                onClick={() => handleClick(index)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="bg-green-400 outline-green-600 h-[45px] w-[45px] rounded-xl flex-center text-center font-bold text-white text-xl"
              />
            );
          })}
        </div>

        <p className="text-xs mt-12 text-center"><Link to="/forgot" className="text-green-600 underline">Click Me</Link> <br /> to change the phone number</p>

        
      </div>
		</div>
	);
};
export default Verification2;
