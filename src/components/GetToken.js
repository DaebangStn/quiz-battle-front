import Cookies from 'js-cookie';

export default function GetToken(){
    return !!Cookies.get('token')
}