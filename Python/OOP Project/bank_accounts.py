

class BalanceException(Exception):
    pass


class BankAccount:
    def __init__(self, initial_balance, accNo):
        self.balance = initial_balance
        self.accNo = accNo
        
        print(f'\n Account No: {self.accNo} created with balance ${self.balance:.2f}')    
    
    def getBalance(self):
        print(f'Account No: {self.accNo} has balance ${self.balance:,}')

    def deposit(self, amount):
        self.balance += amount
        print(f'Deposited ${amount:.2f} into Account No: {self.accNo}')
        self.getBalance()

    def withdraw(self, amount):
        if amount > self.balance:
            raise BalanceException(f"Insufficient funds in Account No: {self.accNo}")
        self.balance -= amount
        print(f'Withdrew ${amount:.2f} from Account No: {self.accNo}')
        self.getBalance()

    def transfer(self, accNo, amount):
        self.withdraw(amount)
        accNo.deposit(amount)
        print(f'Transferred ${amount:.2f} from Account No: {self.accNo} to Account No: {accNo.accNo}')


