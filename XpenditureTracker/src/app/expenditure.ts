export interface Expenditure{
    $key?: string;
    name?: string;
    description?:string;
    category:string;
    amount:number;
    expense_date?:string;
    created_by?:string;
    created_at:string;
}