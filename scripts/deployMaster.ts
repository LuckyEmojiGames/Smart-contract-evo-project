import { Address, toNano } from 'ton-core';
import { Master } from '../wrappers/Master';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const master = provider.open(
        Master.createFromConfig(
            {
                ownerAddress: provider.sender().address as Address,
            },
            await compile('Master')
        )
    );

    await master.sendDeploy(provider.sender(), toNano('0.05'));

    const withdrawAmount = toNano('10'); // Amount to withdraw (in TON)
    await master.sendWithdraw(provider.sender(), {
        withdrawAmount: withdrawAmount, // Pass the withdraw amount
    });

    console.log(`Withdrawal of ${withdrawAmount} nanoton initiated successfully!`);
}