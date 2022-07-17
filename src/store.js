// Vuex 셋팅
import { createStore } from 'vuex'

const store = createStore({
  state(){
    return {
      name : "Kim",
      age : 29,
      like : 100,
      likeChange : false,
    }
  },

  // 자바 게터세터 처럼 변경하는건 여기서 담당하게 하는듯
  mutations : {
    nameChange(state){
        state.name = 'Choi'
    },
    ageChange(state, data){
        state.age = state.age + 1 * data;
    },
    likeChange(state){
        if(!state.likeChange){
            state.like++;
            state.likeChange = true;
        }else{
            state.like--;
            state.likeChange = false;
        }
    }
  }
})

export default store