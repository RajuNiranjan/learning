from bank_accounts import *

John = BankAccount(1000, 1234567890)
Jane = BankAccount(2000, 9876543210)
print("==")
John.getBalance()
Jane.getBalance()
print("====")

John.deposit(39273)
Jane.withdraw(300)
Jane.withdraw(171)
John.transfer(Jane, 2000)
Jane.getBalance()
John.getBalance()
