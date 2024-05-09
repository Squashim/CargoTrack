<?php
declare(strict_types = 1);
$cos = "Hello world";
echo $cos;
function  jakasFunkcja ($cos)
{
   $request[0]['header'] = $cos;
   for($i = 0; $i<100;$i++){
       $request[$i]['header'] = $cos;
   }
   echo json_encode($request);

}
jakasFunkcja("Jebac Konrada");
class USER{
    public $id ;
    public static $id2;
    private $username;
    function setName($id)
    {
        $this->id = $id;
    }
    function getName(){
        return $this->id;
    }
    public function __construct($id, $username){
        $this->id = $id;
        $this->username = $username;

    }
    public function toString(){
        echo $this->id;
        echo " ";
        echo $this->username;
    }

}
$user = new USER(1,"XDDD");
$user -> setName(2);
echo $user->getName();
User::$id2 = 0;
echo USER::$id2;
$user->toString();
