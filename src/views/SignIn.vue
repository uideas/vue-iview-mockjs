<template>
  <div class="wrapper">
    <div class="sign-in-box">
      <Form ref="form" :model="model" :rules="rules">
        <FormItem prop="UserName" :class="errors.UserName ? ['ivu-form-item-error']: []">
          <Input
            type="text"
            v-model="model.UserName"
            placeholder="Please enter your user name"
            @on-change="clearField('UserName')"
            autocomplete="off"
          ></Input>
          <span class="ivu-form-item-error-tip" v-if="errors.UserName">{{errors.UserName}}</span>
        </FormItem>
        <FormItem prop="Password" :class="errors.Password ? ['ivu-form-item-error']: []">
          <Input
            type="password"
            v-model="model.Password"
            placeholder="Please enter your user name"
            @on-change="clearField('Password')"
            autocomplete="off"
          ></Input>
          <span class="ivu-form-item-error-tip" v-if="errors.Password">{{errors.Password}}</span>
        </FormItem>
        <FormItem>
          <div class="sign-in-box-helper">
            <Button type="primary" @click="handleSignIn('form')">Sign In</Button>
            <Button type="default" @click="handleSignUp()">Sign Up</Button>
          </div>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        UserName: "",
        Password: ""
      },
      errors: {
        UserName: "",
        Password: ""
      },
      rules: {
        UserName: [
          { required: true, message: "The 'UserName' must be required" }
        ],
        Password: [
          { required: true, message: "The 'Password' must be required" }
        ]
      }
    };
  },
  methods: {
    clearField(field) {
      this.errors[field] = "";
    },
    handleSignIn(name) {
      this.$refs[name].validate(valid => {
        if (!valid) return;
        this.axios
          .post(this.$API.USER_SIGNIN, this.model)
          .then(res => {
            console.log("res", res.data.data);
            this.$store.commit("SetUserInfo", res.data.data);
            if (this.$route.query.redirect) {
              this.$router.push(this.$route.query.redirect);
            } else {
              this.$router.push({
                name: "dashboard"
              });
            }
          })
          .catch(err => {
            this.$util.renderError(err, this);
          });
        captcha.show();
      });
    }
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  background-image: radial-gradient(#63a5cc, #1c45c3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.sign-in-box {
  background-color: rgba(255, 255, 255, 1);
  width: 400px;
  padding: 30px 60px 10px 60px;
  border: 1px solid #cccccc;
  border-radius: 10px;
  box-shadow: 2px 2px 20px #1c45c3;
}

.sign-in-box-title {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 50px 40px 50px;
}

.sign-in-box-title h1 {
  margin: 0 auto;
  line-height: 40px;
  font-size: 24px;
}

.sign-in-box-title img {
  width: 40px;
}

.sign-in-box-helper {
  display: flex;
  justify-content: space-around;
}
</style>