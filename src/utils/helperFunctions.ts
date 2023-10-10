export const adjustPincode = (x: number) => {
    const words = x.toString().split("");
    const pincode = `${words[0].toString()}${words[1]}${words[2]}-${words[3]}${words[4]}${words[5]}${words[6]}`;
    return pincode;
};

export const numberWithCommas = (x: any) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const createPhoneNumber = (phone: number) => {
    const numbers = phone.toString().split("");

    let firstpart = "";
    let secondpart = "";
    let thirdpart = "";
    for (var i = 0; i < numbers.length; i++) {
        if (i < 3) {
            firstpart += numbers[i].toString();
        } else if (i >= 3 && i < 7) {
            secondpart += numbers[i].toString();
        } else if (i >= 7) {
            thirdpart += numbers[i].toString();
        }
    }
    return `${firstpart}-${secondpart}-${thirdpart}`;
};
