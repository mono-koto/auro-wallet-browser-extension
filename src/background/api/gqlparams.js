/**
 * return account balance
 */
export function getBalanceBody() {
  return `query accountBalance($publicKey: PublicKey!) {
    account(publicKey: $publicKey) {
      balance {
        total
      },
      nonce
      inferredNonce
      delegate
      publicKey
    }
  }
  
  `
}


export function getTxStatusBody() {
  return `
  query txStatus($paymentId:ID! ) {
    transactionStatus(payment: $paymentId)
  }
  `
}

function getStakeTxSendWithRawSignature() {
  return (`
mutation stakeTx($fee:UInt64!, 
$to: PublicKey!, $from: PublicKey!, $nonce:UInt32, $memo: String,
$validUntil: UInt32,$rawSignature: String) {
  sendDelegation(
    input: {
      fee: $fee,
      to: $to,
      from: $from,
      memo: $memo,
      nonce: $nonce,
      validUntil: $validUntil
    }, 
    signature: {rawSignature: $rawSignature}) {
    delegation {
      amount
      fee
      feeToken
      from
      hash
      id
      isDelegation
      memo
      nonce
      kind
      to
    }
  }
}
`)
}

function getStakeTxSendWithScalarField() {
  return (`
mutation stakeTx($fee:UInt64!,
$to: PublicKey!, $from: PublicKey!, $nonce:UInt32, $memo: String,
$validUntil: UInt32, $scalar: String, $field: String) {
  sendDelegation(
    input: {
      fee: $fee,
      to: $to,
      from: $from,
      memo: $memo,
      nonce: $nonce,
      validUntil: $validUntil
    }, 
    signature: {
    field: $field, scalar: $scalar
    }) {
    delegation {
      amount
      fee
      feeToken
      from
      hash
      id
      isDelegation
      memo
      nonce
      kind
      to
    }
  }
}
`)
}

export function getStakeTxSend(isRawSignature) {
  if (isRawSignature) {
    return getStakeTxSendWithRawSignature()
  } else {
    return getStakeTxSendWithScalarField()
  }
}

function getTxSendWithRawSignature() {
  return (`
mutation sendTx($fee:UInt64!, $amount:UInt64!,
$to: PublicKey!, $from: PublicKey!, $nonce:UInt32, $memo: String,
$validUntil: UInt32,$rawSignature: String!
) {
  sendPayment(
    input: {
      fee: $fee,
      amount: $amount,
      to: $to,
      from: $from,
      memo: $memo,
      nonce: $nonce,
      validUntil: $validUntil
    }, 
    signature: {
      rawSignature: $rawSignature
    }) {
    payment {
      amount
      fee
      feeToken
      from
      hash
      id
      isDelegation
      memo
      nonce
      kind
      to
    }
  }
}
`)
}
function getTxSendWithScalarField() {
  return (`
mutation sendTx($fee:UInt64!, $amount:UInt64!,
$to: PublicKey!, $from: PublicKey!, $nonce:UInt32, $memo: String,
$validUntil: UInt32,$scalar: String!, $field: String!
) {
  sendPayment(
    input: {
      fee: $fee,
      amount: $amount,
      to: $to,
      from: $from,
      memo: $memo,
      nonce: $nonce,
      validUntil: $validUntil
    }, 
    signature: {
      field: $field, scalar: $scalar
    }) {
    payment {
      amount
      fee
      feeToken
      from
      hash
      id
      isDelegation
      memo
      nonce
      kind
      to
    }
  }
}
`)
}
/**
 *
 * @param {*} isRawSignature
 */
export function getTxSend(isRawSignature) {
  if (isRawSignature) {
    return getTxSendWithRawSignature()
  } else {
    return getTxSendWithScalarField()
  }
}


export function getPendingTxBody() {
  return `
  query pengdingTx($publicKey: PublicKey) {
    pooledUserCommands(publicKey: $publicKey) {
      id
      nonce
      memo
      isDelegation
      kind
      hash
      from
      feeToken
      fee
      amount
      to
    }
  }
  `
}

function balanceBodyBase(index){
  return `
  account${index}: account (publicKey: $account${index}) {
    balance {
      total
    }
    publicKey
  }
  `
}

export function getBalanceBatchBody(addressArrayLength){
  const variablesDeclare = new Array(addressArrayLength).fill(null).map((_, i)=>`$account${i}:PublicKey!`).join(',')
  const addressesQueryContent = new Array(addressArrayLength).fill(null).map((address, index)=>balanceBodyBase(index))
  return`
  query batchBalance(${variablesDeclare}) {
    ${addressesQueryContent}
  }
  `
}


export function getDaemonStatusBody(){
  return `
  query daemonStatus {
    daemonStatus {
      stateHash
      blockchainLength
      consensusConfiguration {
        epochDuration
        slotDuration
        slotsPerEpoch
      }
    }
  }
  `
}
export function  getBlockInfoBody(){
  return `
  query blockInfo($stateHash: String) {
    block(stateHash: $stateHash) {
      protocolState {
        consensusState {
          epoch
          slot
        }
      }
    }
  }
  `
}

export function getDelegationInfoBody(){
  return `
  query delegationInfo($publicKey: PublicKey!) {
    account(publicKey: $publicKey) {
        delegate
      }
    }
  `
}

/**
 * get chain ID body
 * @returns 
 */
export function getChainIdBody() {
  return `
  query ChainId {
    daemonStatus {
      chainId
    }
  }
  `
}