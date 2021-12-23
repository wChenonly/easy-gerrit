import { QuickPickOptions } from 'vscode';


export const commitEditQuickPickOptions: QuickPickOptions = {
    matchOnDescription: true,
    matchOnDetail: true,
    ignoreFocusOut: true
};


interface CommitDetailType {
    label: string;
    key: string
    description: string,
    detail: string
    isEdit: boolean
}

export const commitDetailType: Array<CommitDetailType> = [
    {
        label: '<Scope>',
        key: 'scope',
        description: '修改范围',
        detail: '本次修改包含哪些模块',
        isEdit: false,
    },
    {
        label: '<Details>',
        key: 'details',
        description: '详细内容',
        detail: '本次修改的详细内容',
        isEdit: false
    }
];
