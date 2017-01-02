export class User{

    public loggedIn : boolean = false;
    public email?:string;
    public nickname?:string;
    public picture?:string;


    public User(email?:string, nickname?:string, picture?:string) {
        this.email=email;
        this.nickname=nickname;
        this.picture=picture;
    }

}