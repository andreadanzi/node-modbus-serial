// create an empty modbus client
//var ModbusRTU = require("modbus-serial");
var ModbusRTU = require("../index");
var client = new ModbusRTU();
// open connection to a tcp line
client.connectTCP("192.168.1.12");


var data = [5 , 6,7,8,9,10];
/* read 10 registers ar 1 Hz , one sample every 1000 millis
 * 1 - The Slave Address.
 * 0 - The Data Address of the first register.
 * 10 - Number of registers to read.
 */
setInterval(function() {
    client.readHoldingRegisters(520, 6, function(err, data) {
        // Little Endian - first is the lsb
        const buf_524 = new Buffer([data.buffer[9],data.buffer[8],data.buffer[11],data.buffer[10]]); // MF524 MC / ORA
        const buf_522 = new Buffer([data.buffer[5],data.buffer[4],data.buffer[7],data.buffer[6]]); // MF522 LITRI / MINUTO
        const buf_520 = new Buffer([data.buffer[1],data.buffer[0],data.buffer[3],data.buffer[2]]); // MF520 CICLI / MINUTO
        // console.log(data);
        var f_520 = buf_520.readFloatLE();
        var f_522 = buf_522.readFloatLE();
        var f_524 = buf_524.readFloatLE();
        console.log("520="+f_520 + "; 522=" + f_522 +  "; 524=" + f_524);
        var ldata = [0 , 0xffff];
        var buf = new Buffer(4);
        buf.writeFloatLE(31.125, 0);
        client.writeRegisters(560,buf);
    });
}, 1000);
