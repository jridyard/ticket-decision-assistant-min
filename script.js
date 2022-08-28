const testing = 'http://localhost:5000'
const production = 'https://www.ticketdecisionassistant.com'
globalThis.environment = production

window.addEventListener('DOMContentLoaded', async (e) => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 2300
    })

    document.querySelector('#confirm-code').addEventListener('click', async () => {

        const alreadyRegisteredCheckRaw = await chrome.storage.local.get('registration')
        const alreadyRegisteredCheck = alreadyRegisteredCheckRaw['registration_code']
        if (alreadyRegisteredCheck) {
            await Toast.fire({ icon: 'error', title: 'You have already registered an access code from this extension.' })
            return
        }

        let activation_code = document.querySelector('#activation_code').value

        try {
            const authorization_status = await fetch(`${globalThis.environment}/api/activate_purchaser_account`, {
                "method": "POST",
                "body": JSON.stringify({
                    'activation_code': activation_code.toString()
                }),
                cache: "no-cache",
                headers: new Headers({
                    "content-type": "application/json"
                })
            }).then((response) => response.json())
            .then((data) => {
                return data
            })
            .catch(err => {
                console.error(err)
                return {'response': 'Unkown error occured. Please contact an admin.'}
            })

            console.log(authorization_status)

            if (authorization_status['response'] == "Success") {
                chrome.storage.local.set({
                    'registration' : authorization_status['registration_code'],
                    'username': authorization_status['username'],
                    'activation_status': authorization_status['activation_status'],
                    'activation_code': activation_code
                })
                document.querySelector('#username').textContent =  authorization_status['username']
                document.querySelector('#activation_status').textContent = authorization_status['activation_status'] == "True" ? "Active" : "Inactive"
                document.querySelector('#pre').style.display = 'none'
                document.querySelector('#post').style.display = 'block'

                await Toast.fire({ icon: 'success', title: 'Your account has been set up!' })

                return
            }
            
            await Toast.fire({ icon: 'error', title: authorization_status['response'] })
        }
        catch (err) {
            console.error(err)
            await Toast.fire({ icon: 'error', title: 'Unknown error occured. Please try again or contact an admin.' })
            return 'Unkown error occured. Please contact an admin.'
        }

    })
        
    let user_token_raw = await chrome.storage.local.get([
        'activation_code'
    ])
    let user_token = user_token_raw['activation_code']

    if (user_token) {
        const authorization_status = await fetch(`${globalThis.environment}/api/check_user_status`, {
            "method": "POST",
            "body": JSON.stringify({
                'activation_code': user_token.toString()
            }),
            cache: "no-cache",
            headers: new Headers({
                "content-type": "application/json"
            })
        }).then((response) => response.json())
        .then((data) => {
            return data
        })

        console.log(authorization_status)
    
        if (authorization_status.response == 'deactivated') {
            chrome.storage.local.set({
                'deactivated': true,
                'reason': authorization_status.reason // "Security" vs "Deleted By User"
            })
        } else {
            chrome.storage.local.set({
                'deactivated': false,
                'reason': null,
                'activation_status': authorization_status.activation_status
            })
        }
    } else {
        document.querySelector('#loader').style.display = 'none'
        document.querySelector('#pre').style.display = 'block'
        return
    }


    let deactivation_data = await chrome.storage.local.get([
        'deactivated', 'reason'
    ])
    let deactivated = deactivation_data['deactivated']
    let reason = deactivation_data['reason']

    if (deactivated) {
        document.querySelector('#loader').style.display = 'none'
        document.querySelector('#pre').style.display = 'none'
        document.querySelector('#post').style.display = 'block'
        document.querySelector('#account_active').style.display = 'none'
        if (reason == 'Security') {
            document.querySelector('#account_inactive_security').style.display = 'block'
        } else {
            document.querySelector('#account_removed').style.display = 'block'
        }
        console.log('ssddsdss')
        return
    }

    console.log('hitting here')

    let data = await chrome.storage.local.get([
        'username', 'activation_status'
    ])
    let user_name = data['username']
    let activation_status = data['activation_status']

    console.log('hwere')
    if (user_name) {
        document.querySelector('#loader').style.display = 'none'
        document.querySelector('#username').textContent = user_name
        document.querySelector('#activation_status').textContent = activation_status == "True" ? "Active" : "Inactive"
        document.querySelector('#pre').style.display = 'none'
        document.querySelector('#post').style.display = 'block'
    } else {
        document.querySelector('#loader').style.display = 'none'
        document.querySelector('#pre').style.display = 'block'
    }

})