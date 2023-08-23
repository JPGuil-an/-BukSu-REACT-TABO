<?php

namespace App\Http\Controllers\Api;

use App\Models\Farm;
use App\Models\User;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;
use App\Models\SupportedProduct;
use App\Models\TransactionDetail;
use App\Http\Controllers\Controller;
use App\Http\Requests\Seller\StoreProductRequest;
use Illuminate\Support\Facades\Crypt;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function allProducts()
    {
        // // $user =User::query()->paginate(4);
        // $products = Product::where('is_approved', 1)
        // ->where('actual_sold - actual_kgs', '!=', 0) //
        // ->orderBy('product_name', 'asc')->paginate(8);
        // return ProductResource::collection($products);
        $products = Product::where('is_approved', 1)
            ->where(function ($query) {
                $query->whereRaw('prospect_harvest_in_kg - actual_sold_kg != 0');
            })
            ->orderBy('product_name', 'asc')
            ->paginate(8);

        return ProductResource::collection($products);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


    public function getFarmInfobyUser(Request $request)
    {
        $user_ID = Crypt::decryptString($request->user_ID);
        $farmsOwnedByUser = Farm::where("farm_owner",  $user_ID)->get();
        return response([
            'farmsOwned' => $farmsOwnedByUser,
            'userID' => $user_ID,
        ]);
    }

    public function getPendingOrders(Request $request)
    {
        $user_ID = Crypt::decryptString($request->user_ID);
        $farmsOwnedByUser = Farm::where("farm_owner",  $user_ID)->get();
        $farmData = [];

        foreach ($farmsOwnedByUser as $farm) {
            $farmTransactions = Transaction::where("from_farm", $farm->id)->where("price_payed", '=',  0)->get();
            $transactionsData = [];

            foreach ($farmTransactions as $transaction) {
                // Access the user_id from the buyers_name in the transaction
                $buyerUser = User::find($transaction->buyers_name);

                $transactionDetails = TransactionDetail::where("transaction_id", $transaction->id)->get();
                $transactionsData[] = [
                    'transaction' => $transaction,
                    'buyer_user' => $buyerUser,
                    'transaction_details' => $transactionDetails,
                ];
            }

            $farmData[] = [
                'farm' => $farm,
                'transactions' => $transactionsData,
            ];
        }

        return response()->json([
            'farmsOwnedByUser' => $farmData,
        ]);
    }



    public function addProduct(StoreProductRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('product_picture')) {
            $photo = $request->file('product_picture');
            $fileName = $photo->getClientOriginalName();
            // Store the file in the public storage inside the 'product_images' folder
            $photo->storeAs('public/Farms/' . $request->farm_belonged, $fileName);
            $data['product_picture'] = $fileName;
        }
        $product = Product::create($data);

        return response()->json(['success' => 'Product Added Successfully']);
    }






    public function getProductTypes()
    {
        $productType = SupportedProduct::all();
        return response([
            'productType' => $productType,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
