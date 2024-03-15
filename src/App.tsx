import "./App.css";
import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from 'ethers';


const App = () => {
    const [hasProvider, setHasProvider] = useState<boolean | null>(null);
    const initialState = { accounts: [] };
    const [wallet, setWallet] = useState(initialState);
    const [balance, setBalance] = useState<bigint>(0n);

    useEffect(() => {
        const refreshAccounts = (accounts: any) => {              /* New */
            if (accounts.length > 0) {                            /* New */
                updateWallet(accounts);                           /* New */
            } else {                                              /* New */
                // if length 0, user is disconnected              /* New */
                setWallet(initialState);                          /* New */
            }                                                     /* New */
        };                                                        /* New */

        const getProvider = async () => {
            const provider = await detectEthereumProvider({ silent: true });
            setHasProvider(Boolean(provider));

            if (provider) {                                       /* New */
                const accounts = await window.ethereum.request(   /* New */
                    { method: "eth_accounts" }                    /* New */
                );                                                /* New */
                refreshAccounts(accounts);                        /* New */
                window.ethereum.on(                               /* New */
                    "accountsChanged",                            /* New */
                    refreshAccounts                               /* New */
                );                                                /* New */
            }                                                     /* New */
        };

        getProvider();
        return () => {                                            /* New */
            window.ethereum?.removeListener("accountsChanged", refreshAccounts);
        };                                                        /* New */
    }, []);

    const updateWallet = async (accounts: any) => {
        setWallet({ accounts });
    };

    const handleConnect = async () => {
      
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        updateWallet(accounts);
    };


    const connectSmartContract = async()=>{

      // Connect to the injected MetaMask provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Connect to your smart contract
      const contractAddress = '0xB8a07f43f5a06E202070341C697A5460D306Df42';
      const  abi= [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_token",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "token",
          "outputs": [
            {
              "internalType": "contract IERC20",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "topUp",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "withdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ] // Your contract ABI
      const contract = new ethers.Contract(contractAddress, abi, provider);
      
      // Call the contract method
      async function callContractMethod() {
        try {
          // Request access to the user's MetaMask account
          await window.ethereum.request({ method: 'eth_requestAccounts' });
      

          const signer = await provider.getSigner();
          const contractWithSigner:any = contract.connect(signer);
      
          // Call your smart contract method
          const result = await contractWithSigner.balanceOf(wallet.accounts[0]);
          console.log(result, typeof result)
          setBalance(await contractWithSigner.balanceOf(wallet.accounts[0]));

          console.log('Transaction successful:', result);
        } catch (error) {
          console.error('Transaction failed:', error);
        }
      }
      
   await   callContractMethod();
      
    }

    const topUpSmartContract = async()=>{

      // Connect to the injected MetaMask provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Connect to your smart contract
      const contractAddress = '0xB8a07f43f5a06E202070341C697A5460D306Df42';
      const  abi= [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_token",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "token",
          "outputs": [
            {
              "internalType": "contract IERC20",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "topUp",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "withdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ] // Your contract ABI
      const contract = new ethers.Contract(contractAddress, abi, provider);
      
      // Call the contract method
      async function callContractMethod() {
        try {
          // Request access to the user's MetaMask account
          await window.ethereum.request({ method: 'eth_requestAccounts' });
      

          const signer = await provider.getSigner();
          const contractWithSigner:any = contract.connect(signer);
      
          // Call your smart contract method
          const result = await contractWithSigner.topUp(1000);


          console.log('Transaction successful:', result);
        } catch (error) {
          console.error('Transaction failed:', error);
        }
      }
      
    await  callContractMethod();

      connectSmartContract();
      
    }

    
    const withdrawSmartContract = async()=>{

      // Connect to the injected MetaMask provider
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Connect to your smart contract
      const contractAddress = '0xB8a07f43f5a06E202070341C697A5460D306Df42';
      const  abi= [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_token",
              "type": "address"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "account",
              "type": "address"
            }
          ],
          "name": "balanceOf",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "token",
          "outputs": [
            {
              "internalType": "contract IERC20",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "topUp",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "to",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "withdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ] // Your contract ABI
      const contract = new ethers.Contract(contractAddress, abi, provider);
      
      // Call the contract method
      async function callContractMethod() {
        try {
          // Request access to the user's MetaMask account
          await window.ethereum.request({ method: 'eth_requestAccounts' });
      

          const signer = await provider.getSigner();
          const contractWithSigner:any = contract.connect(signer);
      
          // Call your smart contract method
          const result = await contractWithSigner.withdraw(wallet.accounts[0],1000);

          console.log('Transaction successful:', result);
        } catch (error) {
          console.error('Transaction failed:', error);
        }
      }
      
    await  callContractMethod();

      connectSmartContract();
      
    }

    return (
        <div className="App">
            <div>
                Injected Provider {hasProvider ? "DOES" : "DOES NOT"} Exist
            </div>

            {window.ethereum?.isMetaMask &&                       /* Updated */
                wallet.accounts.length < 1 && (                       
                    <button onClick={handleConnect}>Connect MetaMask</button>
                )}

            {wallet.accounts.length > 0 && (
              <div>
                <div>Wallet Accounts: {wallet.accounts[0]}</div>
                <button onClick={connectSmartContract}>check Balance MetaMask</button>
                <button>{balance.toString()}</button>
                <button onClick={topUpSmartContract}>topup</button>
                <button onClick={withdrawSmartContract}>withdraw</button>

                
              </div>
            )}
        </div>
    );
};

export default App;