import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Text,
    Button,
    Picker,
    TextInput,
    TouchableOpacity, Platform
} from "react-native";
import {
    BLEPrinter,
    NetPrinter,
    USBPrinter,
    IUSBPrinter,
    IBLEPrinter,
    INetPrinter,
} from "react-native-thermal-receipt-printer";




export default function PrintScreenBLE() {
    const [printers, setPrinters] = useState([]);
    const [currentPrinter, setCurrentPrinter] = useState();
  
    useEffect(() => {
      BLEPrinter.init().then(()=> {
        BLEPrinter.getDeviceList().then(setPrinters);
      });
    }, []);
  
    _connectPrinter => (printer) => {
      //connect printer
      BLEPrinter.connectPrinter(printer.inner_mac_address).then(
        setCurrentPrinter,
        error => console.warn(error))
    }
  
    printTextTest = () => {
      currentPrinter && BLEPrinter.printText("<C>sample text</C>\n");
    }
  
    printBillTest = () => {
      currentPrinter && BLEPrinter.printBill("<C>sample bill</C>");
    }
  
    return (
      <View style={styles.container}>
        {
          this.state.printers.map(printer => (
            <TouchableOpacity key={printer.inner_mac_address} onPress={() => _connectPrinter(printer)}>
              {`device_name: ${printer.device_name}, inner_mac_address: ${printer.inner_mac_address}`}
            </TouchableOpacity>
            ))
        }
        <TouchableOpacity onPress={printTextTest}>
          <Text>Print Text</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={printBillTest}>
          <Text>Print Bill Text</Text>
        </TouchableOpacity>
      </View>
    );
  
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
    },
    section: {
        flex: 1,
    },
    rowDirection: {
        flexDirection: "row",
    },
});