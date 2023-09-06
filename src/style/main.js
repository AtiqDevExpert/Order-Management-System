import { StyleSheet, Dimensions } from 'react-native';

export const colors = {
    primary: '#5CB931',
    seconday: '#4caf9b',
    btnText: '#FFF',
    gray: '#999999',
    description: '#858585',
    title: '#000000',
    white: "#FFF",
    lightWhite: "#FFF",
    lightGray: "#f5f7f9",
    pageBackground: '#FFF',
    darkBackground: "#222327",
    lightDarkBackground: "#323345",
    iconDefaultColor: "#FFF",
    grayDescription: "#67686c",
    whiteIcon: "#fefefd",
    darkBorder: "#2f3034",
    deepGrayText: "#d3d3d3",
    primaryRGB: 'rgb(233 181 95)',
    inputPlaceHolder: "#8b8c9e",
    inputText: "#dcddef",
    arrowIcon: "#9394a6",
    primaryLight: "#cf9f51b8",
    transparent: "#00000069",
    borderColor: "#d9e1e8",

    status: {
        text: {
            pending: "#D62600",
            inprogress: "#0082FA",
            ready: "#D69A00",
            completed: "#5CB931",
            cancelled: "#FFF"
        },
        background: {
            pending: "#f9ded9",
            inprogress: "#d6ebfc",
            ready: "#f6eed7",
            completed: "#e7f4e0",
            cancelled: "#ff0000"
        }
    }
};

export const styles = StyleSheet.create({
    
    f1: {
        flex: 1
    },
    f1bcw: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    f1bcd: {
        flex: 1,
        backgroundColor: colors.lightWhite
    },
    f1bcg: {
        flex: 1,
        backgroundColor: colors.lightGray
    },
    dfjcac: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dfjcfe: {
        flex: 1,
        alignSelf: 'flex-end'
    },
    dfjcfs: {
        flex: 1,
        alignSelf: 'flex-start'
    },
    w100p: {
        width: '100%'
    },
    w90p: {
        width: '90%'
    },
    w80p: {
        width: '80%'
    },
    w20p: {
        width: '20%'
    },
    mt30: {
        marginTop: 30
    },
    jcacfr: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    jcacfc: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    ph30: {
        paddingHorizontal: 30
    },
    ph20: {
        paddingHorizontal: 20
    },
    ph10: {
        paddingHorizontal: 10
    },
    pv30: {
        paddingVertical: 30
    },
    pv20: {
        paddingVertical: 20
    },
    pv10: {
        paddingVertical: 10
    },
    mh30: {
        marginHorizontal: 30
    },
    mh20: {
        marginHorizontal: 20
    },
    mh10: {
        marginHorizontal: 10
    },
    mv30: {
        marginHorizontal: 30
    },
    mv20: {
        marginHorizontal: 20
    },
    mv10: {
        marginHorizontal: 10
    },
    mt10: {
        marginTop: 10
    },
    mt20: {
        marginTop: 20
    },
    mt50: {
        marginTop: 50
    },
    mb10: {
        marginBottom: 10
    },
    mb20: {
        marginBottom: 20
    },
    mb50: {
        marginBottom: 50
    },
    btn: {
        borderRadius: 30,
        backgroundColor: colors.primary,
        height: "auto",
        color: colors.lightWhite
    },
    btnPrint: {
        borderRadius: 30,
        backgroundColor: colors.primary,
        height: "auto",
        color: colors.lightWhite
    },
    btnText: {
        color: colors.btnText,
        fontWeight: '500'
    },
    backBtn: {
        marginLeft: 20
    },

    popupTitle: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700',
        color: colors.primary
    },
    popupDescription: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '300',
        color: colors.grayDescription
    },
    tac: {
        textAlign: 'center'
    },
    pr: {
        position: 'relative'
    },
    pl40: {
        paddingLeft: 40
    },
    pl30: {
        paddingLeft: 30
    },
    pl20: {
        paddingLeft: 20
    },
    pl10: {
        paddingLeft: 10
    },
    pl5: {
        paddingLeft: 5
    },
    pt40: {
        paddingTop: 40
    },
    pt20: {
        paddingTop: 20
    },
    pt10: {
        paddingTop: 10
    },
    dfjcsbaicDefault: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap:"wrap"
    },
    dfjcsbaic: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap:"wrap"
    },
    dfjcsbaicLabels: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    dfjcsbaicSegment: {
        display: 'flex',
        alignSelf:'auto',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: "row"
    },
    jcfsfdcaifs: {
        justifyContent: 'flex-start',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    jcsbfdraic: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    jcfsfdraic: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    darkBackground: {
        backgroundColor: colors.darkBackground
    },
    headerBackground: {
        backgroundColor: colors.lightDarkBackground,
        paddingBottom: 15
    },
    tabBarStyle: {
        paddingTop: 4,
        paddingBottom: 4,
        height: 70,
        backgroundColor: colors.lightDarkBackground,
        borderTopColor: colors.lightDarkBackground,

    },




    authPageTitle: {
        fontSize: 30,
        fontWeight: '700',
        color: colors.primary

    },
    authPageDescription: {
        fontSize: 14,
        fontWeight: '300',
        color: colors.grayDescription,
        textAlign: 'center',
        paddingTop: 10
    },
    loginBorderRadiousDesign: {
        paddingVertical: 30,
        backgroundColor: colors.lightWhite,
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    maxWidth50: {
        maxWidth: '50%'
    },
    maxWidth100: {
        maxWidth: '100%'
    },

    input: {
        width: '100%',
        borderRadius: 30,
        paddingVertical: 30,
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth:1,
        fontSize: 15,
        backgroundColor: colors.lightWhite,
        borderColor: colors.lightDarkBackground,
        color: colors.darkBackground,
        elevation:1,
        overflow:'hidden',
        // height: 40,
        // backgroundColor: "#fff",
        // paddingVertical: 10,
        // paddingHorizontal: 15,
        // borderColor: "#ccc",
        // borderWidth: 1,
        // borderRadius: 15,
        // fontSize: 16,
    },
    inputLabel: {
        fontWeight: '700',
        fontSize: 16,
        paddingBottom: 10,
        paddingLeft: 10,
        marginTop: 10
    },
    pageParagraph: {
        color: colors.grayDescription,
        fontSize: 14
    },
    pageParagraphGray: {
        color: "#858585",
        fontSize: 14
    },
    pageParagraphPrimay: {
        color: colors.primary,
        fontSize: 14,
        marginLeft: 10
    },
    //Login page End



    headerShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },

    headerText: {
        fontSize: 20,
        fontWeight: '700',
        
    },

    headerTextLabels: {
        fontSize: 12,
        fontWeight: '700',
        // backgroundColor:'grey',
        paddingVertical:8,
        paddingHorizontal:1
    },
    headerSubText: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.primary
    },
    listTitle: {
        fontWeight: '700',
        color: colors.primary
    },


    orderIdTitle: {
        fontSize: 20,
        fontWeight: '500'
    },
    orderIdTitlePhone: {
        fontSize: 13,
        fontWeight: '500'
    },
    orderIdTitleActive: {
        fontSize: 20,
        fontWeight: '700'
    },

    orderIdTitleActivePhone: {
        fontSize: 15,
        fontWeight: '700'
    },


    menuItemTitle: {
        fontSize: 20,
        fontWeight: '700'
    },
    menuItemTitlePhone: {
        fontSize: 15,
        fontWeight: '700'
    },
    pricingTableRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        textAlign: 'right'
    },



    pendingStatus: {
        backgroundColor: colors.status.background.pending,
        color: colors.status.text.pending,
        fontSize: 12,
        fontWeight: '700',
        paddingHorizontal: 10,
        textAlign: 'center',
        paddingVertical: 5,
        borderRadius: 5,
        overflow:'hidden'

    },
    inprogressStatus: {
        backgroundColor: colors.status.background.inprogress,
        color: colors.status.text.inprogress,
        fontSize: 12,
        fontWeight: '700',
        paddingHorizontal: 10,
        textAlign: 'center',
        paddingVertical: 5,
        borderRadius: 5,
        overflow:'hidden'
    },
    readyStatus: {
        backgroundColor: colors.status.background.ready,
        color: colors.status.text.ready,
        fontSize: 12,
        fontWeight: '700',
        paddingHorizontal: 10,
        textAlign: 'center',
        paddingVertical: 5,
        borderRadius: 5,
        overflow:'hidden'
    },
    completedStatus: {
        backgroundColor: colors.status.background.completed,
        color: colors.status.text.completed,
        fontSize: 12,
        fontWeight: '700',
        paddingHorizontal: 10,
        textAlign: 'center',
        paddingVertical: 5,
        borderRadius: 5,
        overflow:'hidden'
    },
    cancelledStatus: {
        backgroundColor: colors.status.background.cancelled,
        color: colors.status.text.cancelled,
        fontSize: 12,
        fontWeight: '700',
        paddingHorizontal: 10,
        textAlign: 'center',
        paddingVertical: 5,
        borderRadius: 5,
        overflow:'hidden'
    },




    storeOpenActive: {
        color: "#FFF",
        backgroundColor: "#5cb931",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 22.5,
        overflow:"hidden"
    },
    storeClosedActive: {
        color: "#FFF",
        backgroundColor: "#ed1616",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 22.5,
        overflow:"hidden"
    },
    storeOpenActivePhone: {
        color: "#FFF",
        backgroundColor: "#5cb931",
        // backgroundColor:"green", 
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 17,
        overflow:"hidden",
        
    },
    storeClosedActivePhone: {
        color: "#FFF",
        backgroundColor: "#ed1616",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 17,
        overflow:"hidden"
    },
    storeOpenInActive: {
        color: "#5cb931",
    },
    
    storeClosedInActive: {
        color: "#ed1616"
    },

    

    orderListItem: { 
        backgroundColor: colors.lightWhite, 
        paddingHorizontal: 10, 
        borderRadius: 10, 
        paddingVertical: 10, 
        marginLeft: 15, 
        marginTop: 10, 
        marginBottom: 10, 
        marginRight: 15, 
    },
    orderListItemActive:{
        marginRight: 0, 
        borderBottomRightRadius: 0, 
        borderTopRightRadius: 0, 
        borderLeftColor: colors.primary, 
        borderLeftWidth: 2, 
        paddingRight: 20
    },
    orderItemListContainer:{
        height: "70%",//screen.height - 390,
        padding:20
    },
    orderItemListContainerPhone:{
        height: "70%",//screen.height - 330
        padding:20
    },
    timeCardViewContainer:{
        display:'flex',
        justifyContent:'space-around',
        flexWrap:'wrap',
        alignItems:'center',
        flexDirection:'row'
    },
    timeCardViewActive:{
        color:"#FFF",
        backgroundColor:colors.primary
    },
    timeCardView:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        width:'30%',
        borderWidth:1,
        borderColor:colors.borderColor,
        padding:30,
        margin:10
    },
    timeCardViewPhone:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'column',
        width:'50%',
        borderWidth:1,
        borderColor:colors.borderColor,
        padding:15,
        margin:4
    },
    modalPopup:{
        width:'80%'
    },
    modalPopupNew:{
        width:'90%'
    },
    modalPopupNotification:{
        width:'100%',
        height: '100%',
        maxWidth:'100%',
        maxHeight: '100%',
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        backgroundColor: colors.primary
    }




})