// create an empty modbus client
//var ModbusRTU = require("modbus-serial");
var ModbusRTU = require("../index");
var client = new ModbusRTU();

// open connection to a tcp line
client.connectTCP("127.0.0.1");

/* read 10 registers ar 10 Hz 
 * 1 - The Slave Address.
 * 0 - The Data Address of the first register.
 * 10 - Number of registers to read.
 */
setInterval(function() {
    client.readHoldingRegisters(40001, 20, function(err, data) {
        console.log("P(mA)=" + data.data[4]+"  P(bar)=" +data.data[5]+"  Q(mA)=" +data.data[6]+" Q(lit/min)=" +data.data[7]);
    });
}, 100);
