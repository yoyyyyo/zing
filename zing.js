const kind = {
    eth: 1e18, fin: 1e15,
    sza: 1e12, gwe: 1e09,
    wei: 1e00
}

const unit = (cost, type) => {
    if (!kind[type])
        throw 'invalid type'

    return BigInt(cost) * BigInt(kind[type]);
}

const make = (addr) =>
    '0x' + '73' /* PUSH20 */ + addr + 'ff' /* SELFDESTRUCT */

const send = (addr, cost) => window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [{
        from: window.ethereum.selectedAddress,
        data: make(addr),
        value: '0x' + cost.toString(16)
    }]
})

const zing = async (addr, cost, type) => {
    const tiny = addr.replace('0x', '').toLowerCase();
    if (!/^[a-z0-9]{40}$/.test(tiny))
        throw 'invalid address';
    
    const beam = await send(tiny, unit(cost, type));
    return window.open('https://etherscan.io/tx/' + beam, '_blank');
}

const safe = (func, ...pass) => func(...pass).catch(
    fuck => alert(fuck.message || fuck)
)