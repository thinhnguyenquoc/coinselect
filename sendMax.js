var utils = require('./utils')
// send utxos value to one specific address
module.exports = function sendMax (utxos, outputs, feeRate) {
  if (!isFinite(utils.uintOrNaN(feeRate))) return {}
  var sumInput = utils.sumOrNaN(utxos);
  outputs[0].value = sumInput;
  if (!outputs[0].address) {
    // add fake address to estimate fee
    outputs[0].address = '0000000000000000000000000000000000';
  }
  var bytesAccum = utils.transactionBytes(utxos, outputs)
  var fee = feeRate * bytesAccum
  var outputValue = sumInput - fee;
  outputs[0].value = outputValue;

  return {
    inputs: utxos,
    outputs: outputs,
    fee: fee
  }  
}
