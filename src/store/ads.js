import * as fb from 'firebase'

class Ad{
    constructor(title, desc, owner, img='', promo=false,id=null){
        this.title=title, 
        this.description=desc, 
        this.owner=owner, 
        this.imageSrc=img, 
        this.id=id,
        this.promo=promo
    }
}

export default{
    state:{
        ads:[]
    },
    mutations:{
        createAd(state, payload){
            state.ads.push(payload)
        },
        loadAds(state, payload){
            state.ads = payload
        },
        updateAd(state, {title, description, id}){
            const ad = state.ads.find(r=>{
                return r.id===id
            })
            ad.title = title,
            ad.description = description
        }
    },
    actions:{
        async createAd({commit, getters}, payload){
            commit('clearError')
            commit('setLoading', true)

            const image = payload.image
            try{    
                const newAd= new Ad(
                    payload.title,
                    payload.description,
                    getters.user.id, 
                    '',
                    payload.promo
                    )
                const fbValue = await fb.database().ref('ads').push(newAd)
                const imageExt = image.name.slice(image.name.lastIndexOf('.'))
                
                const fileData = await fb.storage().ref(`ads/${fbValue.key}${imageExt}`).put(image)
                const imageSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()

                await fb.database().ref('ads').child(fbValue.key).update({
                    imageSrc
                })
                commit('createAd', {
                    ...newAd,
                    id: fbValue.key,
                    imageSrc // imageSrc: imageSrc
                })
                commit('setLoading', false)
            }catch(error){
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
            
            
            

        },
        async fetchAds({commit}){
            commit('clearError')
            commit('setLoading', true)

            const resultAds = []

            try{
                const fbval = await fb.database().ref('ads').once('value')
                const ads = fbval.val()

                Object.keys(ads).forEach(key=>{
                    const ad = ads[key]
                    resultAds.push(
                        new Ad(ad.title, ad.description, ad.owner, ad.imageSrc, ad.promo, key)
                    )
                })

                commit('loadAds', resultAds)

                commit('setLoading', false)
            }catch(error){
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        },
        async updateAd({commit}, {title, description, id}){
            commit('clearError')
            commit('setLoading', true)

            try{
                await fb.database().ref('ads').child(id).update({
                    title, description
                })
                commit('updateAd', {
                    title, description, id
                })
                commit('setLoading', false)
            }catch(error){
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        }
    },
    getters:{
        ads(state){
            return state.ads
        },
        promoAds(state){
            return state.ads.filter(r=>{
                return r.promo
            })
        },
        myAds(state, getters){
            return state.ads.filter(r=>{
                return r.owner === getters.user.id 
            })
        },
        adById(state){
            return adId => {
                return state.ads.find(ad => ad.id === adId )
            }
        }
    }
}