import axios from 'axios';
import { ref, reactive } from 'vue';
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, maxLength, helpers, sameAs } from '@vuelidate/validators';

export const useFormService = () => {

    const onlyGmail = (value = "") => {
        return value.includes("@gmail.com");
      }
      
      const onlyNumbers = (value = "") => {
        return !isNaN(value);
      }
      
      const checkIban = (iban) =>
          BigInt([...iban.slice(4), ...iban.slice(0, 4)]
          .map(c => /[a-z]/i.test(c) ? c.toLowerCase().charCodeAt(0) - 87 : c)
          .join('')) % 97n === 1n;
      
      const state = reactive({
        email: '',
        password: '',
        sesso: '',
        cap: '',
        iban: '',
        privacy: false,
      });
      
      const rules = {
        email: {
          // required,
          required: helpers.withMessage("Email obbligatoria", required), 
          // email
          email: helpers.withMessage("Email non valida", email),
          onlyGmail: helpers.withMessage("Email non gmail", onlyGmail),
        },
        password: {
          // required,
          required: helpers.withMessage("Password obbligatoria", required),
          // minLength: minLength(6)
          minLength: helpers.withMessage(
              ({
                  $pending,
                  $invalid,
                  $params,
                  $model
              }) => `Minimo ${$params.min} caratteri, te ne mancano ${ $params.min - $model.length }`, 
              minLength(6)
          )
        },
        sesso: {
          required: helpers.withMessage("Sesso obbligatorio", required),
        },
        cap: {
          required: helpers.withMessage("Cap obbligatorio", required),
          minLength: minLength(5),
          maxLength: maxLength(5),
          onlyNumbers: helpers.withMessage("Solo numeri", onlyNumbers),
        },
        iban: {
          required: helpers.withMessage("IBAN obbligatorio", required),
          minLength: minLength(27),
          maxLength: maxLength(27),
          checkIban: helpers.withMessage("Iban non valido", checkIban),
        },
        // privacy: {
        //   required,
        //   sameAs: sameAs(() => true),
        // }
      }
      
      const v$ = useVuelidate(rules, state)


    const sesso = ref([]);
    const error = ref('');

    const loadData = (async () => {
        try {
            const url = 'https://jsonplaceholder.typicode.com/users'
            const res = await axios.get(url);
            const data = res.data;
            
            const temp = data.map( el => el.name);
            sesso.value = temp;
        }
        catch (e) {
            console.log(e);
            error.value = e;
        }
    });

    const submitForm = async () => {
        console.log(state);
        const url = 'http://localhost:3000/register';
        const response = await axios.post(url, state)
        console.log(response);
      
    }

    return {
        loadData,
        sesso,
        error,
        submitForm,
        onlyGmail,
        onlyNumbers,
        state,
        rules,
        checkIban,
        v$
    }
}