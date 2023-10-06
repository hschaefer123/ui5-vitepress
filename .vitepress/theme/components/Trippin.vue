<template>
    <div id="trippin" class="ui5-content-density-compact">
        <ui5-list class="full-width" id="personList" ref="list" mode="SingleSelect">
            <ui5-li v-for="person in people" :key="person.userName"
                :icon="person.gender === 'Male' ? 'male' : 'female'" :description="person.emails[0] ? person.emails[0] : ''"
                :additional-text="person.userName">{{ person.firstName }} {{ person.lastName }}
            </ui5-li>
        </ui5-list>
    </div>
</template>

<script>
// UI5
import { defineComponent, ref } from "vue";
import UI5WebComponentsMixin from "../mixins/UI5WebComponentsMixin.js";
import "@ui5/webcomponents/dist/List.js";
import "@ui5/webcomponents/dist/StandardListItem.js";

// UI5 Icons
import "@ui5/webcomponents-icons/dist/male.js";
import "@ui5/webcomponents-icons/dist/female.js";

// OData model usage
import { TrippinService } from "../model/trippin/TrippinService";
import { FetchClient } from "@odata2ts/http-client-fetch";
// use this url to avoid cors issues (supports preflight) !!!
const baseUrl = "https://services.odata.org/Trippin_Staging/(S(iw1anra4xygjyssbeef0yeyy))/"
const httpClient = new FetchClient(undefined, {
    // only relevant for POST/PATCH CSRF support
    useCsrfProtection: true,
    csrfTokenFetchUrl: "/Trippin"
});
const trippinService = new TrippinService(httpClient, baseUrl);

export default defineComponent({
    name: "Trippin",
    mixins: [UI5WebComponentsMixin],
    data() {
        return {
            people: []
        }
    },
    async mounted() {
        const response = await trippinService.people().query(
            (builder) => builder.top(10)
        );
        if (response.status === 200) {
            this.people = response.data.value;
        }
    }
});
</script>