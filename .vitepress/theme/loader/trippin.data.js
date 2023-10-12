export default {
    async load() {
        // fetch remote data
        return (await fetch('https://services.odata.org/Trippin_Staging/(S(iw1anra4xygjyssbeef0yeyy))//People?%24select=FirstName,LastName,UserName&%24top=100')).json()
    }
}