<template>
    <div style="text-align: left">
        <h2>@nexjs/ws - Auth Contract</h2>
        <ul>
            <li>
                <button @click="register">register</button>
                <input type="text" :value="registerEmail" />
                <input type="text" :value="registerPassword" />
            </li>
            <li>
                <button @click="login">login</button>
                <input type="text" :value="loginEmail" />
                <input type="text" :value="loginPassword" />
            </li>
            <li>
                <button @click="logout">logout</button>
            </li>
            <li>
                <button @click="subscribe">subscribe</button>
                <button @click="unsubscribe">unsubscribe</button>
            </li>
            <li>
                <button @click="print">send</button>
                demo.print()
            </li>
            <li><button @click="notify">send</button> demo.notify()</li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { wsapi } from '@/wsapi';

@Component
export default class WSAuthContractComponent extends Vue {
    registerEmail = 'juan@any.com';
    registerPassword = '123456';

    loginEmail = 'juan@any.com';
    loginPassword = '123456';

    constructor() {
        super();
        console.log('[WSAuthContractComponent] constructor()');
    }

    //#region [ Vue ]
    async mounted() {
        console.log('[WSAuthContractComponent] mounted()');
        wsapi.authContract.onUpdate.on(() =>
            console.log(`[credentialContract] onUpdate`)
        );
        wsapi.authContract.onDataUpdate.on((data) =>
            console.log(`[credentialContract] onDataUpdate`, data)
        );
    }
    async destroyed() {
        console.log('[WSAuthContractComponent] destroyed()');
        wsapi.authContract.onUpdate.off();
        wsapi.authContract.onDataUpdate.off();
    }
    //#endregion

    //#region [ auth methods ]
    async register() {
        try {
            console.log('[WSAuthContractComponent] register');
            await wsapi.auth.register({
                email: this.registerEmail,
                password: this.registerPassword,
            });
        } catch (err) {
            console.warn(err);
        }
    }

    async login() {
        try {
            console.log('[WSAuthContractComponent] login');
            await wsapi.auth.login({
                email: this.registerEmail,
                password: this.registerPassword,
            });
        } catch (err) {
            console.warn(err);
        }
    }
    async logout() {
        try {
            console.log('[WSAuthContractComponent] logout');
            await wsapi.auth.logout();
        } catch (err) {
            console.warn(err);
        }
    }
    //#endregion

    async subscribe() {
        try {
            console.log('[WSAuthContractComponent] subscribe request');
            await wsapi.authContract.onUpdate.sub();
            await wsapi.authContract.onDataUpdate.sub();
            console.log('[WSAuthContractComponent] subscribe response');
        } catch (err) {
            console.warn(err);
        }
    }

    async unsubscribe() {
        try {
            console.log('[WSAuthContractComponent] unsubscribe request');
            await wsapi.authContract.onUpdate.unsub();
            await wsapi.authContract.onDataUpdate.unsub();
            console.log('[WSAuthContractComponent] unsubscribe response');
        } catch (err) {
            console.warn(err);
        }
    }

    async print() {
        try {
            console.log('[WSAuthContractComponent] print() request');
            await wsapi.authContract.print();
            console.log('[WSAuthContractComponent] print() response');
        } catch (err) {
            console.warn(err);
        }
    }

    async notify() {
        try {
            console.log('[WSAuthContractComponent] notify() request');
            await wsapi.authContract.notify();
            console.log('[WSAuthContractComponent] notify() response');
        } catch (err) {
            console.warn(err);
        }
    }
}
</script>
