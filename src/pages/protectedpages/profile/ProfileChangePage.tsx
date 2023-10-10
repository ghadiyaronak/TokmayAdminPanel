//services
import { useState, useEffect } from "react";
import { GET_ADMIN_PROFILE } from "../../../utils/url";
import { useAppDispatch } from "../../../store/hooks";
import { setProfileData } from "../../../store/slices/authSlice";
import { AxiosError } from "axios";

//components
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import client from "../../../apiConfig/client";
import CustomLoader from "../../../components/loader/CustomLoader";

const ProfileChange = () => {
    //state
    const [mode, setMode] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [details, setDetails] = useState<any>({});

    //hooks
    const dispatch = useAppDispatch();

    //profile mode
    const handleModeChange = () => {
        setMode(!mode);

        if (!mode) {
            getAdminProfile();
        }
    };

    //api call
    const getAdminProfile = async () => {
        setIsLoading(true);
        try {
            const result = await client.get(GET_ADMIN_PROFILE);
            const data = result?.data?.data;
            setDetails(data);
            dispatch(setProfileData(data));
        } catch (error: AxiosError | any) {
            console.log({ error });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAdminProfile();
    }, []);

    return (
        <div>
            {isLoading ? (
                <div>
                    <CustomLoader />
                </div>
            ) : (
                <>
                    {mode ? (
                        <Profile details={details} handleModeChange={handleModeChange} />
                    ) : (
                        <EditProfile handleModeChange={handleModeChange} details={details} />
                    )}
                </>
            )}
        </div>
    );
};

export default ProfileChange;
