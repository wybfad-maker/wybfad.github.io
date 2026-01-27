//  Created by www.runoob.com on 15/11/9.
//  Copyright © 2015年 菜鸟教程. All rights reserved.
//
 
#include <stdio.h>
 
int main() {
    int i, j, result;
    printf("\n");
    for (i = 1; i < 10; i++) {
        for (j = 1; j <= i; j++) {
            result = i * j;
            printf("%d*%d=%-3d", i, j, result); /* -3d表示左对齐，占3位 */
        }
        printf("\n"); /* 每一行后换行 */
    }

    int a=176,b=219;
    printf("%d+%d=%d\n",a,b,a+b);
    printf("%d-%d=%d\n",a,b,a-b);
    printf("%d*%d=%d\n",a,b,a*b);
    printf("%d/%d=%d\n",a,b,a/b);
    printf("%d%%%d=%d\n",a,b,a%b);
    // char a[] = 'B0',b[] = 'DB';
    printf("%c%c%c%c%c\n",b,a,a,a,b);
    printf("%c%c%c%c%c\n",a,b,a,b,a);
    printf("%c%c%c%c%c\n",a,a,b,a,a);
    printf("%c%c%c%c%c\n",a,b,a,b,a);
    printf("%c%c%c%c%c\n",b,a,a,a,b);

    int n, m, t1 = 0, t2 = 1, nextTerm;
    printf("输出几项: ");
    scanf("%d", &m);
    printf("斐波那契数列: ");
    for (n = 1; n <= m; ++n)
    {
        printf("%d, ", t1);
        nextTerm = t1 + t2;
        t1 = t2;
        t2 = nextTerm;
    }
    return 0;
}