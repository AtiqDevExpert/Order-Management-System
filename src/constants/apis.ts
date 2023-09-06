export const API_BASE_URL = "https://us-central1-links-app-d5366.cloudfunctions.net/ordermanager/";
export const APIS = {
    LOGIN: API_BASE_URL + "login",
    LOGOUT: API_BASE_URL + "logout",
    GET_STORE_INFO: API_BASE_URL + "get_store_info",
    ORDERS: API_BASE_URL + "get_orders_today",
    UPDATE_ORDER_STATUS: API_BASE_URL + "update_order_status",
    CANCEL_ORDER: API_BASE_URL + "deny_order",
    UPDATE_STORE_STATUS: API_BASE_URL + "update_store_status",
    UPDATE_ORDER_ITEM_AVAILABE_STATUS: API_BASE_URL + "remove_item",
    GET_MENU_ITEMS: API_BASE_URL + "get_menu",
    UPDATE_MENU_ITEM_AVAILABE_STATUS: API_BASE_URL + "change_availability",
    
}
export const MESSAGES = {
    DEFAULT_ERROR_MESSAGE : "Unable to process your request!"
}  